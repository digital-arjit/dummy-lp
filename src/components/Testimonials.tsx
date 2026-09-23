/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from 'lucide-react';
import { TESTIMONIALS } from '../data/weddingData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-[#F7F3EC] text-[#1C1A18] relative overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* Subtle background botanical vector motif */}
      <svg
        className="absolute top-0 right-0 w-96 h-96 text-[#211E1A]/[0.03] pointer-events-none transform translate-x-20 -translate-y-10"
        viewBox="0 0 200 200"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M42.7,-72.2C54.6,-67.7,63.1,-55.8,70.5,-42.9C77.9,-30,84.1,-15,83.9,-0.1C83.7,14.8,77.1,29.6,68.6,42.7C60.1,55.8,49.8,67.1,36.9,73.5C24.1,79.9,8.7,81.4,-6.2,80C-21.1,78.6,-35.6,74.2,-48.7,66.6C-61.8,59,-73.6,48.2,-80.1,34.7C-86.6,21.1,-87.8,4.9,-84.9,-10.1C-82,-25,-75,-38.7,-64.7,-48.9C-54.3,-59.1,-40.7,-65.8,-27.4,-69.3C-14.1,-72.8,0,-73.2,14.2,-74.6C28.4,-76,42.7,-72.2,42.7,-72.2Z" />
      </svg>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <HeartHandshake className="w-4 h-4 text-[#D9B477]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D857A]">
              WORDS FROM THE HEART
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18] tracking-tight mb-4">
            WHAT OUR COUPLES SAY
          </h2>

          <div className="w-12 h-[1px] bg-[#D9B477] mx-auto mt-4" />
        </div>

        {/* Featured Testimonial Card */}
        <div className="relative bg-white rounded-2xl p-8 sm:p-12 md:p-16 shadow-xl border border-[#211E1A]/10 text-center flex flex-col items-center">
          {/* Quote Icon */}
          <div className="w-14 h-14 rounded-full bg-[#F7F3EC] border border-[#D9B477]/40 flex items-center justify-center text-[#D9B477] mb-8">
            <Quote className="w-6 h-6" />
          </div>

          {/* 5-Star Champagne Gold Rating */}
          <div className="flex items-center gap-1.5 mb-8 text-[#D9B477]" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current text-[#D9B477]" />
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="max-w-3xl mb-8 min-h-[120px] flex items-center justify-center">
            <p className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#1C1A18] font-light leading-relaxed">
              "{current.quote}"
            </p>
          </blockquote>

          {/* Client Details */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#1C1A18]/10">
            <img
              src={current.coverPhoto}
              alt={current.coupleNames}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#D9B477]"
            />
            <div className="text-left">
              <cite className="not-italic font-sans text-sm sm:text-base font-semibold tracking-wider uppercase text-[#1C1A18] block">
                {current.coupleNames}
              </cite>
              <span className="text-xs text-[#8D857A] font-sans">
                {current.location} • {current.weddingDate}
              </span>
            </div>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between w-full mt-10 pt-6 border-t border-[#1C1A18]/5">
            <button
              id="testimonial-prev-btn"
              type="button"
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-[#1C1A18]/20 flex items-center justify-center text-[#1C1A18] hover:bg-[#211E1A] hover:text-[#F7F3EC] hover:border-[#211E1A] transition-all focus:outline-none focus:ring-1 focus:ring-[#D9B477]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  id={`testimonial-dot-${idx}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-[#D9B477]'
                      : 'w-2 bg-[#1C1A18]/20 hover:bg-[#1C1A18]/40'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button
              id="testimonial-next-btn"
              type="button"
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-[#1C1A18]/20 flex items-center justify-center text-[#1C1A18] hover:bg-[#211E1A] hover:text-[#F7F3EC] hover:border-[#211E1A] transition-all focus:outline-none focus:ring-1 focus:ring-[#D9B477]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
