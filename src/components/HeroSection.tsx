/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Compass, Award, Calendar } from 'lucide-react';
import { HERO_IMAGE, BRAND_INFO } from '../data/weddingData';

interface HeroSectionProps {
  onCheckDateClick: () => void;
  onExploreStoriesClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckDateClick,
  onExploreStoriesClick,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#211E1A]"
      aria-label="Hero Introduction"
    >
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE.url}
          alt={HERO_IMAGE.alt}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[center_30%] sm:object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Layered cinematic gradients for flawless text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171513]/95 via-[#211E1A]/75 to-[#211E1A]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A] via-transparent to-[#171513]/50" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(23,21,19,0.7)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-16 lg:py-32 flex flex-col justify-between min-h-[85vh]">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 mb-5 px-3.5 py-1.5 rounded-full border border-[#D9B477]/30 bg-[#211E1A]/40 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9B477] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-sans font-medium uppercase tracking-[0.25em] text-[#D9B477]">
              YOUR WEDDING DESERVES
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="font-editorial text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-[#F7F3EC] leading-[1.08] tracking-tight mb-6"
          >
            MORE THAN <br />
            <span className="italic font-serif text-[#D9B477] relative inline-block">
              PHOTOGRAPHS.
              <span className="block absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-[#D9B477]/80 to-transparent" />
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="font-sans text-base sm:text-lg lg:text-xl text-[#F7F3EC]/80 font-light max-w-xl leading-relaxed mb-10"
          >
            Candid photography & cinematic films crafted around your story.
            Unposed emotions, heritage grandeur, and memories preserved for generations.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              id="hero-cta-check-date"
              onClick={onCheckDateClick}
              type="button"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] font-sans text-xs tracking-[0.2em] uppercase font-semibold rounded-[2px] transition-all duration-300 shadow-lg shadow-[#D9B477]/10 hover:shadow-[#D9B477]/25 group"
            >
              <span>CHECK YOUR WEDDING DATE</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            <button
              id="hero-cta-explore-stories"
              onClick={onExploreStoriesClick}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-[#F7F3EC]/25 text-[#F7F3EC] hover:text-[#D9B477] hover:border-[#D9B477]/60 font-sans text-xs tracking-[0.2em] uppercase font-medium rounded-[2px] transition-all duration-300 backdrop-blur-xs bg-[#211E1A]/20 group"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#D9B477] group-hover:scale-110 transition-transform" />
              <span>EXPLORE OUR STORIES</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Trust & Editorial Metrics Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="pt-12 mt-8 border-t border-[#F7F3EC]/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-[#F7F3EC]/70"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D9B477]/30 flex items-center justify-center text-[#D9B477]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="font-editorial text-lg text-[#F7F3EC] font-normal leading-none mb-1">
                {BRAND_INFO.experienceYears}
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#8D857A]">
                Years Documenting
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D9B477]/30 flex items-center justify-center text-[#D9B477]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-editorial text-lg text-[#F7F3EC] font-normal leading-none mb-1">
                {BRAND_INFO.weddingsCaptured}
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#8D857A]">
                Weddings Preserved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#D9B477]/30 flex items-center justify-center text-[#D9B477]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <p className="font-editorial text-lg text-[#F7F3EC] font-normal leading-none mb-1">
                {BRAND_INFO.countriesTraveled} Countries
              </p>
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#8D857A]">
                Destination Reach
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-end">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8D857A] text-right font-light">
              MUMBAI • UDAIPUR • DELHI • WORLDWIDE
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
