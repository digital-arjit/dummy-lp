/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { APPROACH_STEPS, APPROACH_IMAGE } from '../data/weddingData';

interface ApproachSectionProps {
  onCheckDateClick: () => void;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ onCheckDateClick }) => {
  return (
    <section
      id="approach"
      className="py-24 lg:py-32 bg-[#211E1A] text-[#F7F3EC] relative border-t border-[#D9B477]/15 overflow-hidden"
      aria-label="Our Approach and Process"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Eyebrow */}
        <div className="mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D9B477]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#D9B477]">
              PHILOSOPHY & PROCESS
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F3EC] tracking-tight">
            YOUR STORY, OUR APPROACH.
          </h2>
          <div className="w-16 h-[1px] bg-[#D9B477] mt-4" />
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Large Editorial Framed Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#D9B477]/30 shadow-2xl bg-[#171513]">
              <img
                src={APPROACH_IMAGE.url}
                alt={APPROACH_IMAGE.alt}
                loading="lazy"
                className="w-full aspect-[3/4] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211E1A]/80 via-transparent to-transparent" />
              
              {/* Subtle ornamental floating quote badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#211E1A]/90 backdrop-blur-md border border-[#D9B477]/30 rounded-[2px]">
                <p className="font-editorial italic text-base sm:text-lg text-[#F7F3EC] leading-snug mb-1">
                  "The most beautiful moments are never staged. They simply unfold."
                </p>
                <span className="text-[10px] font-sans tracking-[0.2em] text-[#D9B477] uppercase">
                  Forever Frames Creative Direction
                </span>
              </div>
            </div>

            {/* Decorative background border offset */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full border border-[#D9B477]/20 rounded-lg -z-10 pointer-events-none" />
          </div>

          {/* Right Column: Numbered Process & Details */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="space-y-8">
              {APPROACH_STEPS.map((step) => (
                <div
                  key={step.number}
                  id={`approach-step-${step.number}`}
                  className="group relative pl-14 sm:pl-16 pb-8 border-b border-[#F7F3EC]/10 last:border-b-0 transition-colors"
                >
                  {/* Step Number with Gold Accent */}
                  <span className="absolute left-0 top-0 font-editorial text-3xl sm:text-4xl text-[#D9B477] font-light tracking-tighter group-hover:scale-105 transition-transform">
                    {step.number}
                  </span>

                  <h3 className="font-sans text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#F7F3EC] mb-2 group-hover:text-[#D9B477] transition-colors">
                    {step.title}
                  </h3>

                  {/* Core exact description from user instructions */}
                  <p className="font-editorial italic text-xl sm:text-2xl text-[#F7F3EC]/90 font-light leading-relaxed mb-2">
                    "{step.description}"
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-[#8D857A] font-light leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Small Action CTA */}
            <div className="pt-4">
              <button
                id="approach-cta-timeless"
                type="button"
                onClick={onCheckDateClick}
                className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.22em] uppercase font-medium text-[#D9B477] hover:text-[#F7F3EC] group transition-colors py-2 border-b border-[#D9B477] hover:border-[#F7F3EC]"
              >
                <span>LET’S CREATE SOMETHING TIMELESS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
