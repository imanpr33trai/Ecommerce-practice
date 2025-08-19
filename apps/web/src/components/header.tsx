"use client";
import Link from "next/link";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";
import { Input } from "./ui/input";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import { SearchInput } from "./searchInput";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-[#0f172a] px-3 to-[#334155] backdrop-blur ">
      <div className="container flex h-13 max-w-7xl mx-auto items-center justify-between">
        <div className="mr-4 hidden md:flex ">
          <Link
            href="/"
            className="mr-6 flex px-1 items-center rounded-full bg-white space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6"
            >
              <rect width="256" height="256" fill="none" />
              <line
                x1="208"
                y1="128"
                x2="128"
                y2="208"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
              <line
                x1="192"
                y1="40"
                x2="40"
                y2="192"
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="hidden font-bold text-black sm:inline-block">
              SINGH
            </span>
          </Link>
          <SearchInput className="rounded-full " />
        </div>
        <nav className="flex flex-row gap-3">
          <Button className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <Link href={"wishlist"}>
              <Heart className="text-black h-4 w-4" />
            </Link>
          </Button>
          <Button className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <Link href={"cart"}>
              <ShoppingCart className="text-black h-4 w-4" />
            </Link>
          </Button>
          <Button className="rounded-full bg-white w-8 h-8 flex items-center justify-center">
            <Link href={"profile"}>
              <User className="text-black h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

{
  /* <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none "></div>
         <div className="flex items-center gap-2">
            <ModeToggle />
           
          </div> 
        </div> */
}
