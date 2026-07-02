"use client";

import { AnimatePresence, motion, easeIn, easeOut } from "framer-motion";
import { useState } from "react";
import LiquidGlass from "@/components/LiquidGlass";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  session: any;
};

// ─── Animation Variants ───────────────────────────────────────────
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: easeIn, delay: 0.1 } },
};

const menuVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: {
      duration: 0.25,
      ease: easeIn,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOut } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2, ease: easeIn } },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut, delay: 0.35 },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.2, ease: easeIn },
  },
};

// ─── Nav Links ────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/pricing" },
  { label: "Changelog", href: "/changelog" },
  { label: "Careers", href: "/careers" },
];

// ─── Component ───────────────────────────────────────────────────
const Navbar = ({ session }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* ─── Top Navbar ─── */}
      <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2 w-full md:w-auto px-4">
        <LiquidGlass
          borderRadius={18}
          backdropBlur={8}
          backgroundOpacity={0.02}
          borderWidth={0.035}
          brightness={32}
          opacity={0.55}
          distortionScale={-180}
          redOffset={0}
          greenOffset={20}
          blueOffset={40}
          displace={1.5}
          rimIntensity={0.25}
          className="border border-white/[0.04] p-0"
        >
          <div className="relative flex items-center justify-between gap-3 p-2 md:gap-40">
            <div className="flex items-center gap-3 pl-1 md:gap-4">
              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-delight-500bold tracking-tight text-white"
              >
                <Image
                  alt="Logo"
                  src="/logo.svg"
                  height={0}
                  width={0}
                  className="h-[18px] w-[27px] md:h-[20px] md:w-[30px]"
                />
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden items-center gap-8 md:flex">
                <Link
                  href="#"
                  className="text-sm cursor-pointer font-delight-500 text-white/70 transition hover:text-white"
                >
                  Pricing
                </Link>
                <Link
                  href="#"
                  className="text-sm cursor-pointer font-delight-500 text-white/70 transition hover:text-white"
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  className="text-sm cursor-pointer font-delight-500 text-white/70 transition hover:text-white"
                >
                  Blog
                </Link>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-2">
                {session ? (
                  <Link href="/apps">
                    <Button className="cursor-pointer flex items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-sm font-delight-500 text-black transition hover:bg-neutral-200">
                      Apps
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button className="cursor-pointer flex items-center gap-2 rounded-[10px] bg-white px-3 py-2 text-sm font-delight-500 text-black transition hover:bg-neutral-200">
                      Login
                    </Button>
                  </Link>
                )}
              </div>

              {/* ─── Hamburger (mobile only) ─── */}
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
                className="flex size-8 cursor-pointer items-center justify-center rounded-md text-white transition-colors duration-200 ease-out hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131319] focus-visible:outline-none active:bg-white/[0.12] md:hidden"
              >
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
                  <path d="M4 5h16" />
                  <path d="M4 12h16" />
                  <path d="M4 19h16" />
                </svg>
              </button>
            </div>
          </div>
        </LiquidGlass>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] md:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Blurred Backdrop */}
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{
                background:
                  "radial-gradient(115% 55% at 50% 18%, rgba(10, 144, 248, 0.2) 0%, rgba(10, 144, 248, 0.04) 42%, transparent 64%), linear-gradient(rgba(10, 11, 16, 0.92) 0%, rgba(6, 7, 10, 0.97) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative flex h-full flex-col px-6 pt-5 pb-[max(2rem,env(safe-area-inset-bottom))]">

              {/* ── Top Row: Logo + Close ── */}
              <motion.div
                className="flex items-center justify-between"
                variants={itemVariants}
              >
                <Link
                  href="/"
                  aria-label="Home"
                  className="flex items-center gap-2.5"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image
                    alt="Logo"
                    src="/logo.svg"
                    height={20}
                    width={30}
                    className="h-[20px] w-[30px]"
                  />
                  <span className="font-display text-[19px] leading-none font-light tracking-[0.01em] text-white">
                    YourBrand {/* ← replace with your brand name */}
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="flex size-9 cursor-pointer items-center justify-center rounded-[10px] text-white transition-colors duration-200 ease-out hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none active:bg-white/[0.12]"
                >
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
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </motion.div>

              {/* ── Nav Links (staggered) ── */}
              <motion.nav
                className="flex flex-1 flex-col justify-center"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navLinks.map((item) => (
                  <motion.div key={item.label} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-white/[0.08] py-[18px]"
                    >
                      <span className="font-display text-[30px] leading-none font-light tracking-[-0.01em] text-white/90 transition-colors duration-200 group-hover:text-white group-active:text-white">
                        {item.label}
                      </span>
                      {/* Arrow Up-Right */}
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
                        className="size-[22px] text-white/25 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/70"
                        aria-hidden="true"
                      >
                        <path d="M7 7h10v10" />
                        <path d="M7 17 17 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* ── Bottom: CTAs + Socials ── */}
              <motion.div
                className="flex flex-col gap-6"
                variants={bottomVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* CTA Buttons */}
                <div className="flex flex-col gap-2.5">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-[12px] bg-[#1d1d24] py-3.5 text-[15px] font-medium tracking-tight text-white transition-colors duration-200 ease-out hover:bg-[#26262f] active:bg-[#1a1a20]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="group flex w-full items-center justify-center gap-2 rounded-[12px] bg-white py-3.5 text-[15px] font-medium tracking-tight text-[#191919] transition-colors duration-200 ease-out hover:bg-neutral-200 active:bg-neutral-300"
                  >
                    Get started
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
                      className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Socials + Contact */}
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
                  <div className="flex items-center gap-2.5">
                    {/* X / Twitter */}
                    <a
                      href="https://x.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="flex size-10 items-center justify-center rounded-[11px] bg-white/[0.06] text-white/70 transition-all duration-200 ease-out hover:bg-white/[0.12] hover:text-white active:scale-95"
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-hidden="true"
                        className="size-[18px]"
                      >
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="flex size-10 items-center justify-center rounded-[11px] bg-white/[0.06] text-white/70 transition-all duration-200 ease-out hover:bg-white/[0.12] hover:text-white active:scale-95"
                    >
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
                        className="size-[18px]"
                        aria-hidden="true"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="flex size-10 items-center justify-center rounded-[11px] bg-white/[0.06] text-white/70 transition-all duration-200 ease-out hover:bg-white/[0.12] hover:text-white active:scale-95"
                    >
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
                        className="size-[18px]"
                        aria-hidden="true"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>

                  <a
                    href="mailto:hello@yourdomain.com"
                    className="text-[13px] text-white/45 transition-colors duration-200 hover:text-white"
                  >
                    Contact
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;