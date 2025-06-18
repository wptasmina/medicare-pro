"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";


const navItems = [
  // { href: "/", label: "Home" },
  // { href: "/dashboard", label: "Dashboard" },
  // { href: "/doctors", label: "Doctors" },
  { href: "/signin", label: "Login" },

];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white dark:bg-zinc-900 dark:border-zinc-700 shadow-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Medicare<span className="text-neutral-800 dark:text-white">Pro</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-neutral-800 dark:text-neutral-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-700">
          <div className="flex flex-col gap-3 p-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-neutral-700 hover:text-blue-600 dark:text-neutral-300 dark:hover:text-white transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
