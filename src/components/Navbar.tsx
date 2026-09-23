/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../data/weddingData';

interface NavbarProps {
  onCheckDateClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCheckDateClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'STORIES', href: '#stories' },
    { label: 'WHY US', href: '#why-us' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'APPROACH', href: '#approach' },
    { label: 'CONTACT', href: '#inquiry' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#211E1A]/95 backdrop-blur-md py-3.5 border-b border-[#D9B477]/15 shadow-2xl'
          : 'bg-gradient-to-b from-[#171513]/80 via-[#211E1A]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          id="nav-logo-link"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#home');
          }}
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-1 focus:ring-[#D9B477]"
        >
          <div className="w-9 h-9 rounded-full border border-[#D9B477]/60 flex items-center justify-center text-[#D9B477] transition-transform duration-300 group-hover:scale-105 group-hover:border-[#D9B477]">
            <Camera className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <span className="block font-editorial text-xl sm:text-2xl font-light tracking-[0.2em] text-[#F7F3EC] group-hover:text-[#D9B477] transition-colors">
              {BRAND_INFO.name}
            </span>
            <span className="block text-[9px] tracking-[0.28em] text-[#D9B477] uppercase font-sans font-medium">
              {BRAND_INFO.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              id={`nav-link-${link.label.toLowerCase()}`}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="text-xs tracking-[0.22em] font-sans text-[#F7F3EC]/85 hover:text-[#D9B477] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D9B477] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary CTA & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            id="nav-cta-check-date"
            onClick={onCheckDateClick}
            type="button"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-sans tracking-[0.18em] uppercase font-medium bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] transition-all duration-300 rounded-[2px] shadow-sm hover:shadow-[#D9B477]/20 group"
          >
            <span>CHECK YOUR DATE</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Mobile menu button */}
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#F7F3EC] hover:text-[#D9B477] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="nav-mobile-drawer"
          className="lg:hidden bg-[#211E1A] border-b border-[#D9B477]/20 px-6 py-6 transition-all duration-300 shadow-2xl animate-in slide-in-from-top duration-300"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-mobile-${link.label.toLowerCase()}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-sans tracking-[0.2em] text-[#F7F3EC] hover:text-[#D9B477] transition-colors py-2 border-b border-[#F7F3EC]/5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                id="nav-mobile-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onCheckDateClick();
                }}
                type="button"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs tracking-[0.2em] uppercase font-medium bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] transition-colors"
              >
                <span>CHECK YOUR DATE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
