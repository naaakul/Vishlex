// app/api/apps/[appId]/stats/route.ts
import { NextResponse } from "next/server"
import { prisma }       from "@/lib/prisma"
import getServerSession from "@/utils/getServerSession"
import { decrypt }      from "@/lib/crypto"
import { runPgQuery }   from "@/lib/db/connections"

type Range = "7d" | "30d" | "90d"
const RANGE_INTERVAL: Record<Range, string> = {
  "7d":  "7 days",
  "30d": "30 days",
  "90d": "90 days",
}

function getInterval(req: Request): string {
  const range = (new URL(req.url).searchParams.get("range") ?? "30d") as Range
  return RANGE_INTERVAL[range] ?? RANGE_INTERVAL["30d"]
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const session = await getServerSession()
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { appId } = await params

  const app = await prisma.app.findFirst({
    where:  { id: appId, userId: session.user.id },
    select: {
      id:         true,
      trackingId: true,   // ← FIXED: was missing
      status:     true,
      database:   { select: { id: true, encryptedDbUri: true } },
    },
  })
  if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const dbUri    = decrypt(app.database.encryptedDbUri)
  const interval = getInterval(req)
  const tid      = app.trackingId   // ← FIXED: use trackingId not app.id

  const [
    pageviews, visitors, sessions, bounces,
    topPages, topReferrers, topUtm,
    countries, devices, browsers, oses,
  ] = await Promise.all([
    runPgQuery(app.id, dbUri, `
      SELECT COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT COUNT(DISTINCT visitor_hash) AS count FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT COUNT(*) AS count FROM antz_sessions
      WHERE tracking_id = $1 AND started_at >= NOW() - $2::INTERVAL
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT ROUND(
        100.0 * SUM(CASE WHEN page_count = 1 THEN 1 ELSE 0 END)
        / NULLIF(COUNT(*), 0), 1
      ) AS rate
      FROM antz_sessions
      WHERE tracking_id = $1 AND started_at >= NOW() - $2::INTERVAL
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT url, COUNT(*) AS views FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
      GROUP BY url ORDER BY views DESC LIMIT 10
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT referrer, COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1
        AND referrer IS NOT NULL AND referrer != ''
        AND created_at >= NOW() - $2::INTERVAL
      GROUP BY referrer ORDER BY count DESC LIMIT 10
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT utm_source, utm_medium, utm_campaign, COUNT(*) AS count
      FROM antz_pageviews
      WHERE tracking_id = $1
        AND utm_source IS NOT NULL
        AND created_at >= NOW() - $2::INTERVAL
      GROUP BY utm_source, utm_medium, utm_campaign
      ORDER BY count DESC LIMIT 10
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT country, COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1
        AND country IS NOT NULL AND country != ''
        AND created_at >= NOW() - $2::INTERVAL
      GROUP BY country ORDER BY count DESC LIMIT 10
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT device, COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
      GROUP BY device ORDER BY count DESC
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT browser, COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
      GROUP BY browser ORDER BY count DESC
    `, [tid, interval]),

    runPgQuery(app.id, dbUri, `
      SELECT os, COUNT(*) AS count FROM antz_pageviews
      WHERE tracking_id = $1 AND created_at >= NOW() - $2::INTERVAL
      GROUP BY os ORDER BY count DESC
    `, [tid, interval]),
  ])

  return NextResponse.json({
    status:      app.status,
    pageviews:   Number((pageviews[0]  as any)?.count ?? 0),
    visitors:    Number((visitors[0]   as any)?.count ?? 0),
    sessions:    Number((sessions[0]   as any)?.count ?? 0),
    bounceRate:  Number((bounces[0]    as any)?.rate  ?? 0),
    topPages,
    topReferrers,
    topUtm,
    countries,
    devices,
    browsers,
    oses,
  })
}