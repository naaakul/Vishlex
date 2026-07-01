import LiquidGlass from "@/components/LiquidGlass";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
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
                alt=""
                src={"/logo.svg"}
                height={0}
                width={0}
                className="h-[18px] w-[27px] md:h-[20px] md:w-[30px]"
              ></Image>
            </Link>

            {/* Nav */}
            <nav className="hidden items-center gap-8 md:flex">
              <Link
                href="#"
                className="text-sm font-delight-500 text-white/70 transition hover:text-white"
              >
                Pricing
              </Link>

              <Link
                href="#"
                className="text-sm font-delight-500 text-white/70 transition hover:text-white"
              >
                Careers
              </Link>

              <Link
                href="#"
                className="text-sm font-delight-500 text-white/70 transition hover:text-white"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 ">
            <Button
              className="
                  rounded-[10px]
                  bg-[#1d1d24]
                  px-3
                  py-2
                  text-sm
                  font-delight-500
                  text-white
                  transition
                  hover:bg-[#292933]
                "
            >
              Login
            </Button>

            <Button
              className="
                  flex
                  items-center
                  gap-2
                  rounded-[10px]
                  bg-white
                  px-3
                  py-2
                  text-sm
                  font-delight-500
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
            </Button>
          </div>
        </div>
      </LiquidGlass>
    </header>
  );
};

export default Navbar;
