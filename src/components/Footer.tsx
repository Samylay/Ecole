"use client";

import Link from "next/link";
import { useLocale } from "@/lib/locale-context";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold text-white">Layaida</span>
            </div>
            <p className="text-gray-400 max-w-md">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Layaida</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">{t.footer.about}</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">{t.footer.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">{t.footer.terms}</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">{t.footer.privacy}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Layaida. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
