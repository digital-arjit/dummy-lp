/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { FEATURED_STORIES } from '../data/weddingData';
import { FeaturedStory } from '../types';
import { StoryModal } from './StoryModal';

interface FeaturedStoriesProps {
  onInquireAboutStory: (storyTitle: string) => void;
}

export const FeaturedStories: React.FC<FeaturedStoriesProps> = ({
  onInquireAboutStory,
}) => {
  const [selectedStory, setSelectedStory] = useState<FeaturedStory | null>(null);

  return (
    <section
      id="stories"
      className="py-24 lg:py-32 bg-[#F7F3EC] text-[#1C1A18] relative overflow-hidden"
      aria-label="Featured Wedding Stories"
    >
      {/* Decorative ambient subtle watermark */}
      <div className="absolute top-10 right-10 text-[#1C1A18]/[0.03] font-editorial text-9xl select-none pointer-events-none hidden lg:block">
        Stories
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D9B477]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#8D857A]">
              CURATED CELEBRATIONS
            </span>
          </div>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1A18] tracking-tight mb-4">
            REAL WEDDINGS. REAL STORIES.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#8D857A] max-w-xl mx-auto leading-relaxed">
            A collection of moments, emotions, and celebrations that deserve to be remembered.
          </p>

          <div className="w-12 h-[1px] bg-[#D9B477] mx-auto mt-6" />
        </div>

        {/* 3 Featured Wedding Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {FEATURED_STORIES.map((story) => (
            <article
              key={story.id}
              id={`story-card-${story.id}`}
              onClick={() => setSelectedStory(story)}
              className="group cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-[#211E1A]/10 hover:border-[#D9B477]/50 shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1.5 focus-within:ring-2 focus-within:ring-[#D9B477]"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedStory(story);
                }
              }}
              role="button"
              aria-label={`View story of ${story.title}`}
            >
              {/* Image Container with Subtle Zoom */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#211E1A]/5">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A18]/70 via-transparent to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#211E1A]/85 backdrop-blur-xs text-[#D9B477] text-[10px] tracking-[0.2em] font-semibold uppercase rounded-[2px] border border-[#D9B477]/30">
                    {story.category}
                  </span>
                </div>

                {/* Location Overlay on Image Bottom */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F7F3EC]">
                  <span className="flex items-center gap-1.5 font-light tracking-wide text-[#F7F3EC]/90">
                    <MapPin className="w-3.5 h-3.5 text-[#D9B477]" />
                    {story.location}
                  </span>
                  <span className="text-[11px] font-sans text-[#D9B477] font-medium">
                    {story.date}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white">
                <div>
                  <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#8D857A] mb-1 font-medium">
                    {story.coupleNames}
                  </p>
                  <h3 className="font-editorial text-2xl sm:text-2xl text-[#1C1A18] font-normal leading-snug mb-3 group-hover:text-[#D9B477] transition-colors">
                    {story.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#8D857A] line-clamp-3 leading-relaxed mb-6 font-light">
                    {story.excerpt}
                  </p>
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 border-t border-[#1C1A18]/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase font-semibold text-[#1C1A18] group-hover:text-[#D9B477] transition-colors">
                    <span>VIEW STORY</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] text-[#8D857A] font-mono">
                    Full Gallery + Film
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Story Detail Lightbox / Narrative Modal */}
      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onInquireAboutStory={onInquireAboutStory}
      />
    </section>
  );
};
