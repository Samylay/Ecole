"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/lib/locale-context";

export default function FAQPage() {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                {t.nav.home}
              </Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">{t.nav.faq}</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{t.faq.title}</h1>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">{t.faq.subtitle}</p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {t.faq.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-indigo-600 flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-5 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.faq.cta}</h2>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">{t.faq.ctaDesc}</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              {t.faq.ctaButton}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
