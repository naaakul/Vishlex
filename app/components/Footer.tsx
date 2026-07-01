import Link from "next/link";
import VishlexWatermark from "@/components/VishlexWatermark";

function IconX() {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="size-5"
    >
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5 fill-current text-white"
      aria-label="love"
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-[9px] bg-white/[0.06] text-white/80 transition-all hover:scale-105 hover:bg-white/[0.12] hover:text-white active:scale-95"
    >
      {children}
    </a>
  );
}

type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

function NavColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <div>
      {" "}
      <div className="mb-6 flex h-11 items-center rounded-lg bg-gradient-to-r from-white/[0.08] to-transparent px-3.5">
        <h3 className="text-[15px] text-white">{title}</h3>
      </div>
      <ul className="flex flex-col gap-[18px]">
        {items.map((item) => (
          <li key={item.label}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-[8px] text-[14px] text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="ml-[8px] text-[14px] text-white/60 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const NAV_COLUMNS: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Careers", href: "/careers" },
      {
        label: "Y Combinator",
        href: "https://www.ycombinator.com/companies/Vishlex",
        external: true,
      },
      {
        label: "Contact",
        href: "mailto:founders@useVishlex.com",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative">
      <div
          className="pointer-events-none absolute top-0 w-full h-full"
          style={{
            background:
              "radial-gradient(circle at 50% -33%, rgba(10, 10, 17, 1) 46%, rgba(7, 101, 174, 1) 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.55) 38%, #000 70%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.55) 38%, #000 70%)",
          }}
        />
      
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col px-6 md:px-10">
        <div className="flex flex-col gap-12 pt-12 lg:flex-row lg:gap-0 lg:pt-14">
          <div className="lg:w-[34%] lg:shrink-0 lg:pr-10">
            <p className="font-display max-w-[320px] text-[28px] font-instrument leading-[1.18] font-light tracking-[-0.01em] text-white sm:text-[34px] lg:text-[40px] lg:leading-[1.2]">
              Make better decisions 10x faster with clean web analytics.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <SocialLink href="https://x.com/useVishlex" label="X (Twitter)">
                <IconX />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/useVishlex"
                label="Instagram"
              >
                <IconInstagram />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/company/Vishlexinc"
                label="LinkedIn"
              >
                <IconLinkedIn />
              </SocialLink>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:border-l lg:border-white/[0.07] lg:pl-12">
            {NAV_COLUMNS.map((col) => (
              <NavColumn key={col.title} title={col.title} items={col.items} />
            ))}
          </div>
        </div>
        <div className="mt-14 border-t border-white/[0.07]">
          <VishlexWatermark />
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/[0.07] py-4 sm:flex-row">
          <p className="text-[15px] text-white/55">
            © 2026 Vishlex Inc. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[15px] text-white/55">
            Made with <IconHeart /> in BLR
          </p>
        </div>
      </div>
      
    </footer>
  );
}
