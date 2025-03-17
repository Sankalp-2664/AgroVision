"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/agriculture.png";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
  const pathname = usePathname(); // Get the current path
  const user = null;
  const isAdmin = false;

  // Function to determine active class
  const getActiveClass = (path: string) =>
    pathname === path ? "text-green-600 font-bold" : "text-gray-700";

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
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
                  href={"/logout"}
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign Out
                </Link>

                {isAdmin ? (
                  <Link
                    href="/admin/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
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
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
