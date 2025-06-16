"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-800 dark:bg-gray-900 text-gray-300 py-10">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 text-left">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">Medicare Pro</h2>
            <p className="text-xs sm:text-sm">
              Your trusted hospital management system for seamless healthcare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold text-gray-200 mb-3">Quick Links</h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/" className="hover:text-white font-medium">Home</Link></li>
              <li><Link href="/about" className="hover:text-white font-medium">About Us</Link></li>
              <li><Link href="/doctors" className="hover:text-white font-medium">Services</Link></li>
              <li><Link href="/contact" className="hover:text-white font-medium">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-bold text-gray-200 mb-3">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Community</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="min-w-68 md:min-w-0 font-medium">
            <h2 className="text-lg font-bold text-gray-200 mb-3">Contact Us</h2>
            <p className="text-xs sm:text-sm inline-flex gap-1 items-center">
              <MapPin className="text-white text-sm" />
              123, Medicare Pro HQ, Dhaka, Bangladesh
            </p>
            <p className="text-xs sm:text-sm inline-flex gap-1 items-center">
              <Phone className="text-white text-sm" />
              +880 1234 567 890
            </p>
            <p className="text-xs sm:text-sm inline-flex gap-1 items-center">
              <Mail className="text-white text-sm" />
              support@medicarepro.com
            </p>

            <div className="flex justify-start mt-4 space-x-4">
              <Link href="https://www.facebook.com" className="text-white text-2xl">
                <Facebook />
              </Link>
              <Link href="https://x.com" className="text-white text-2xl">
                <Twitter />
              </Link>
              <Link href="https://www.linkedin.com" className="text-white text-2xl">
                <Linkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-4">
          <div className="text-center border-t border-gray-600 mt-8 pt-4 text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Medicare Pro. All Rights Reserved.</p>
          </div>

          <div className="text-center">
            <ul className="text-xs sm:text-sm flex justify-center md:gap-4 gap-2">
              <li>
                <Link href="#" className="text-white hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="text-white border-l-2 md:pl-4 pl-2 border-white hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-white border-l-2 md:pl-4 pl-2 border-white hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
