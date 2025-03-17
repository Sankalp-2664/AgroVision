"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/agriculture.png";
import { Button, buttonVariants } from "../ui/button";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path
  const user = null;
  const isAdmin = false;

  // Theme switcher state
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to determine active class
  const getActiveClass = (path: string) =>
    pathname === path
      ? "text-green-600 font-bold"
      : "text-gray-700 dark:text-gray-300";

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-black/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-zinc-700">
          {/* Logo */}
          <Link href="/" className="flex flex-row z-40 font-semibold">
            <Image src={Logo} alt="Logo" className="h-7 w-7 mr-2" />
            <div className="mt-[1px] text-lg">
              Agro<span className="text-green-600">Vision</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6 font-medium">
            <Link
              href="/"
              className={`hover:text-green-600 transition ${getActiveClass(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`hover:text-green-600 transition ${getActiveClass(
                "/about"
              )}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-green-600 transition ${getActiveClass(
                "/contact"
              )}`}
            >
              Contact
            </Link>
          </div>

          {/* Auth & Actions */}
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/logout"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign Out
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard ✨
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                    className: `font-semibold ${getActiveClass("/auth/login")}`,
                  })}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    className: `hidden sm:flex items-center gap-1 font-semibold ${getActiveClass(
                      "/auth/register"
                    )}`,
                  })}
                >
                  Sign Up
                </Link>
                <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700 hidden sm:block" />

                {/* Theme Switcher */}
                {mounted && (
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
