"use client";
"use strict";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/next/index.tsx
var next_exports = {};
__export(next_exports, {
  VishProvider: () => VishProvider,
  VishlexProvider: () => VishlexProvider,
  useVishlex: () => useVishlex
});
module.exports = __toCommonJS(next_exports);
var import_react = require("react");
var import_navigation = require("next/navigation");

// src/lib/fingerprint.ts
var _visitorHash = null;
var _sessionHash = null;
function getVisitorHash() {
  if (_visitorHash) return _visitorHash;
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    (/* @__PURE__ */ new Date()).getTimezoneOffset(),
    navigator.hardwareConcurrency ?? ""
  ].join("|");
  _visitorHash = hashString(raw);
  return _visitorHash;
}
function getSessionHash() {
  if (_sessionHash) return _sessionHash;
  const STORAGE_KEY = "vsh_session";
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      _sessionHash = stored;
      return _sessionHash;
    }
  } catch {
  }
  const bucket = Math.floor(Date.now() / (1e3 * 60 * 30));
  _sessionHash = hashString(getVisitorHash() + "|" + bucket);
  try {
    sessionStorage.setItem(STORAGE_KEY, _sessionHash);
  } catch {
  }
  return _sessionHash;
}
function hashString(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = hash * 16777619 >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

// src/lib/device.ts
function getDevice() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "mobile";
  return "desktop";
}
function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Firefox/")) return "Firefox";
  if (ua.includes("Safari/")) return "Safari";
  return "Other";
}
function getOS() {
  const ua = navigator.userAgent;
  if (/windows/i.test(ua)) return "Windows";
  if (/macintosh|mac os/i.test(ua)) return "macOS";
  if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/linux/i.test(ua)) return "Linux";
  return "Other";
}

// src/lib/utm.ts
function getUTMParams(search = location.search) {
  const p = new URLSearchParams(search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_term: p.get("utm_term"),
    utm_content: p.get("utm_content")
  };
}
function getReferrer() {
  const ref = document.referrer;
  if (!ref) return null;
  try {
    const refHost = new URL(ref).hostname;
    if (refHost === location.hostname) return null;
  } catch {
    return null;
  }
  return ref;
}

// src/lib/payload.ts
function buildPageviewPayload(trackingId, durationMs = null) {
  const utm = getUTMParams();
  return {
    type: "pageview",
    tracking_id: trackingId,
    url: location.pathname + location.search,
    referrer: getReferrer(),
    ...utm,
    device: getDevice(),
    browser: getBrowser(),
    os: getOS(),
    visitor_hash: getVisitorHash(),
    session_hash: getSessionHash(),
    duration_ms: durationMs
  };
}
function buildEventPayload(trackingId, name, properties = null) {
  return {
    type: "event",
    tracking_id: trackingId,
    name,
    properties,
    url: location.pathname + location.search,
    visitor_hash: getVisitorHash(),
    session_hash: getSessionHash()
  };
}

// src/lib/sender.ts
function send(payload, endpoint) {
  const body = JSON.stringify(payload);
  if (typeof navigator === "undefined") return;
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    const queued = navigator.sendBeacon(endpoint, blob);
    if (queued) return;
  }
  fetch(endpoint, {
    method: "POST",
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true
  }).catch(() => {
  });
}

// src/next/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var VishlexContext = (0, import_react.createContext)({ trackEvent: () => {
} });
function useVishlex() {
  return (0, import_react.useContext)(VishlexContext);
}
function TrackerInner({
  trackingId,
  collectUrl,
  disabled = false
}) {
  const pathname = (0, import_navigation.usePathname)();
  const searchParams = (0, import_navigation.useSearchParams)();
  const pageEnteredAt = (0, import_react.useRef)(Date.now());
  const lastPathRef = (0, import_react.useRef)(null);
  const sendPageview = (0, import_react.useCallback)(
    (durationMs = null) => {
      if (disabled || typeof window === "undefined") return;
      send(buildPageviewPayload(trackingId, durationMs), collectUrl);
    },
    [trackingId, collectUrl, disabled]
  );
  (0, import_react.useEffect)(() => {
    const currentPath = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    if (lastPathRef.current === currentPath) return;
    if (lastPathRef.current !== null) {
      sendPageview(Date.now() - pageEnteredAt.current);
    } else {
      sendPageview(null);
    }
    lastPathRef.current = currentPath;
    pageEnteredAt.current = Date.now();
  }, [pathname, searchParams, sendPageview]);
  (0, import_react.useEffect)(() => {
    if (disabled) return;
    const onHide = () => {
      if (document.visibilityState === "hidden") {
        sendPageview(Date.now() - pageEnteredAt.current);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [disabled, sendPageview]);
  return null;
}
function VishlexProvider({ trackingId, collectUrl, disabled = false, children }) {
  const trackEvent = (0, import_react.useCallback)(
    (name, properties) => {
      if (disabled || typeof window === "undefined") return;
      send(buildEventPayload(trackingId, name, properties ?? null), collectUrl);
    },
    [trackingId, collectUrl, disabled]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VishlexContext.Provider, { value: { trackEvent }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      TrackerInner,
      {
        trackingId,
        collectUrl,
        disabled
      }
    ) }),
    children
  ] });
}
function VishProvider({ disabled = false, children }) {
  const trackingId = process.env.NEXT_PUBLIC_VISHLEX_TRACKING_ID;
  const collectUrl = process.env.NEXT_PUBLIC_VISHLEX_COLLECT_URL;
  if (!trackingId || !collectUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Vishlex] Missing env vars.\nAdd to .env.local:\n  NEXT_PUBLIC_VISHLEX_TRACKING_ID=...\n  NEXT_PUBLIC_VISHLEX_COLLECT_URL=..."
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    VishlexProvider,
    {
      trackingId,
      collectUrl,
      disabled,
      children
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VishProvider,
  VishlexProvider,
  useVishlex
});
