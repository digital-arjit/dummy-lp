/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Instagram, Youtube, Pin as Pinterest, ArrowUp, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

interface FooterProps {
  onCheckDateClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCheckDateClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Stories', href: '#stories' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Approach', href: '#approach' },
    { label: 'Contact', href: '#inquiry' },
  ];

  return (
    <footer
      id="site-footer"
      className="bg-[#171513] text-[#F7F3EC] border-t border-[#D9B477]/15 pt-20 pb-12 relative"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Banner with Footer CTA */}
        <div className="pb-16 mb-16 border-b border-[#F7F3EC]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#D9B477] font-semibold block mb-2">
              LIMITED COMMISSIONS YEARLY
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EC]">
              YOUR STORY STARTS HERE.
            </h3>
          </div>

          <button
            id="footer-cta-starts-here"
            type="button"
            onClick={onCheckDateClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-[2px] transition-all shadow-lg group"
          >
            <span>CHECK YOUR WEDDING DATE</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#F7F3EC]/10">
          {/* Col 1-2: Brand Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#D9B477]/60 flex items-center justify-center text-[#D9B477]">
                <Camera className="w-4 h-4" />
              </div>
              <span className="font-editorial text-2xl font-light tracking-[0.2em] text-[#F7F3EC]">
                {BRAND_INFO.name}
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#8D857A] max-w-sm leading-relaxed font-light">
              {BRAND_INFO.tagline}. {BRAND_INFO.philosophy}
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-4">
              <a
                id="footer-social-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F7F3EC]/15 hover:border-[#D9B477] text-[#8D857A] hover:text-[#D9B477] flex items-center justify-center transition-colors"
                aria-label="Forever Frames on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-youtube"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F7F3EC]/15 hover:border-[#D9B477] text-[#8D857A] hover:text-[#D9B477] flex items-center justify-center transition-colors"
                aria-label="Forever Frames on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                id="footer-social-pinterest"
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#F7F3EC]/15 hover:border-[#D9B477] text-[#8D857A] hover:text-[#D9B477] flex items-center justify-center transition-colors"
                aria-label="Forever Frames on Pinterest"
              >
                <Pinterest className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-[#D9B477] font-semibold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8D857A] font-sans">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-[#F7F3EC] transition-colors tracking-wider"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Placeholders */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-[#D9B477] font-semibold mb-4">
              Studio & Inquiries
            </h4>
            <div className="space-y-2.5 text-xs text-[#8D857A] font-sans">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D9B477]" />
                <span>{BRAND_INFO.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D9B477]" />
                <span>{BRAND_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D9B477]" />
                <span>{BRAND_INFO.locations}</span>
              </p>
            </div>
            <p className="text-[11px] text-[#8D857A]/80 pt-2 italic">
              Booking consultations available in-person in Mumbai & Delhi or via private Zoom session.
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8D857A]">
          <p>© 2026 Forever Frames. All rights reserved.</p>

          <button
            id="footer-back-to-top"
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#8D857A] hover:text-[#D9B477] transition-colors group"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
