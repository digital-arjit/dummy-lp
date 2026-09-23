/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sparkles, Maximize2, MapPin } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/weddingData';
import { GalleryCategory, PortfolioItem } from '../types';
import { LightboxModal } from './LightboxModal';

export const PortfolioGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [activeLightboxItem, setActiveLightboxItem] = useState<PortfolioItem | null>(null);

  const categories: GalleryCategory[] = ['ALL', 'CANDID', 'CEREMONIES', 'PORTRAITS', 'FILMS'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') {
      return PORTFOLIO_ITEMS;
    }
    return PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="portfolio"
      className="py-24 lg:py-32 bg-[#F7F3EC] text-[#1C1A18] relative"
      aria-label="Selected Visual Portfolio"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#D9B477]" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D857A]">
                A GLIMPSE INTO OUR WORLD
              </span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#1C1A18] leading-[1.1] tracking-tight">
              MOMENTS THAT <br />
              <span className="italic text-[#8D857A]">LIVE FOREVER.</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div
            id="portfolio-category-filters"
            className="flex flex-wrap items-center gap-2 border-b border-[#1C1A18]/10 pb-2 md:pb-0"
            role="tablist"
            aria-label="Gallery category filters"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`filter-btn-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`px-4 py-2 text-xs font-sans tracking-[0.2em] uppercase rounded-full transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-[#211E1A] text-[#F7F3EC] shadow-md scale-105'
                      : 'bg-transparent text-[#8D857A] hover:text-[#1C1A18] hover:bg-[#211E1A]/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry / Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]">
          {filteredItems.map((item, idx) => {
            // Asymmetrical grid spans based on item aspect
            const spanClasses =
              item.aspect === 'tall'
                ? 'sm:row-span-2'
                : item.aspect === 'wide'
                ? 'sm:col-span-2'
                : 'row-span-1';

            return (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => setActiveLightboxItem(item)}
                className={`group relative overflow-hidden rounded-lg bg-[#211E1A] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${spanClasses}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveLightboxItem(item);
                  }
                }}
                aria-label={`View full image: ${item.title}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Ambient dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#171513]/90 via-[#211E1A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-[#F7F3EC]" />

                {/* Top Badge on hover */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <span className="inline-block px-2.5 py-1 bg-[#D9B477] text-[#211E1A] text-[9px] font-sans font-bold tracking-[0.2em] uppercase rounded-[2px]">
                    {item.category}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="w-9 h-9 rounded-full bg-[#211E1A]/80 border border-[#D9B477]/40 flex items-center justify-center text-[#D9B477]">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Details on hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <p className="font-editorial text-xl sm:text-2xl text-[#F7F3EC] leading-snug mb-1">
                    {item.title}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-[#D9B477] font-sans tracking-wide">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery bottom footnote */}
        <div className="mt-12 text-center">
          <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#8D857A]">
            SHOWCASING MOMENTS FROM 350+ WEDDINGS ACROSS INDIA & DESTINATIONS WORLDWIDE
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(newItem) => setActiveLightboxItem(newItem)}
      />
    </section>
  );
};
