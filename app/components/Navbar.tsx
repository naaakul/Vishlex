import Link from "next/link";
import Glass from "./Glass";
import LiquidFilter from "./LiquidFilter";

export default function Navbar() {
  return (
    <>
      <LiquidFilter />

      <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="relative overflow-hidden rounded-[18px]">
          <Glass />

          <div className="relative z-10 flex h-[58px] items-center justify-between gap-10 px-4">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-white"
            >
              Cardboard
            </Link>

            {/* Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="#"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                Changelog
              </Link>

              <Link
                href="#"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                Pricing
              </Link>

              <Link
                href="#"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                Careers
              </Link>

              <Link
                href="#"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                Blog
              </Link>
            </nav>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <button
                className="
                  rounded-[10px]
                  bg-[#1d1d24]
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-[#292933]
                "
              >
                Login
              </button>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  rounded-[10px]
                  bg-white
                  px-4
                  py-2
                  text-sm
                  font-medium
                  text-black
                  transition
                  hover:bg-neutral-200
                "
              >
                Get Started

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}