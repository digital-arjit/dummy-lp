/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Camera, Film, Heart } from 'lucide-react';
import { WHY_CHOOSE_US_DATA } from '../data/weddingData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera className="w-8 h-8 text-[#D9B477]" strokeWidth={1.25} />;
      case 'Film':
        return <Film className="w-8 h-8 text-[#D9B477]" strokeWidth={1.25} />;
      case 'Heart':
        return <Heart className="w-8 h-8 text-[#D9B477]" strokeWidth={1.25} />;
      default:
        return <Camera className="w-8 h-8 text-[#D9B477]" strokeWidth={1.25} />;
    }
  };

  return (
    <section
      id="why-us"
      className="py-24 lg:py-32 bg-[#211E1A] text-[#F7F3EC] relative border-t border-b border-[#D9B477]/15"
      aria-label="Why Couples Choose Us"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.3em] text-[#D9B477] block mb-3">
            OUR PROMISE & SIGNATURE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EC] tracking-tight mb-4">
            WHY COUPLES CHOOSE US
          </h2>
          <div className="w-12 h-[1px] bg-[#D9B477]/60 mx-auto mt-4" />
        </div>

        {/* 3 Evenly Spaced Feature Blocks with Minimal Line Separators on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9B477]/20">
          {WHY_CHOOSE_US_DATA.map((item, index) => (
            <div
              key={item.id}
              id={`why-feature-${item.id}`}
              className={`flex flex-col items-center text-center p-8 lg:p-12 transition-all duration-300 group hover:bg-[#2B2723]/30 ${
                index === 0 ? 'pt-0 md:pt-8 md:pl-0' : ''
              } ${index === 2 ? 'pb-0 md:pb-8 md:pr-0' : ''}`}
            >
              {/* Thin Champagne-Gold Outlined Icon Container */}
              <div className="w-20 h-20 rounded-full border border-[#D9B477]/40 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:border-[#D9B477] bg-[#211E1A] shadow-inner">
                {getIcon(item.iconName)}
              </div>

              {/* Heading */}
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F3EC] font-normal tracking-wide mb-4 group-hover:text-[#D9B477] transition-colors">
                {item.heading}
              </h3>

              {/* Exact Description requested in user prompt */}
              <p className="font-editorial italic text-lg sm:text-xl text-[#D9B477] font-light leading-relaxed max-w-xs mb-3">
                {item.description}
              </p>

              {/* Detailed Supporting Context */}
              <p className="font-sans text-xs sm:text-sm text-[#8D857A] font-light leading-relaxed max-w-xs">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
