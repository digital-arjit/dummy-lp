/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Clock, Film, CheckCircle2, ChevronRight } from 'lucide-react';
import { FeaturedStory } from '../types';

interface StoryModalProps {
  story: FeaturedStory | null;
  onClose: () => void;
  onInquireAboutStory: (storyTitle: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  story,
  onClose,
  onInquireAboutStory,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (story) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div
      id="story-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#171513]/85 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="story-modal-title"
    >
      <div
        id="story-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F7F3EC] text-[#1C1A18] rounded-lg shadow-2xl border border-[#D9B477]/30 flex flex-col"
      >
        {/* Modal Close Button */}
        <button
          id="story-modal-close"
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#211E1A]/80 text-[#F7F3EC] hover:bg-[#211E1A] hover:text-[#D9B477] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#D9B477]"
          aria-label="Close story modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image with Gradient */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#171513]/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-[#F7F3EC]">
            <div className="inline-block px-3 py-1 bg-[#D9B477] text-[#211E1A] text-[10px] tracking-[0.2em] font-semibold uppercase rounded-[2px] mb-2">
              {story.category}
            </div>
            <h2 id="story-modal-title" className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EC] mb-2">
              {story.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#F7F3EC]/85 tracking-wider">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D9B477]" />
                {story.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D9B477]" />
                {story.date}
              </span>
              <span>Couple: <strong className="text-[#D9B477]">{story.coupleNames}</strong></span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Story Narrative */}
          <div>
            <h3 className="text-xs font-sans tracking-[0.25em] uppercase text-[#8D857A] mb-3">
              The Celebration Narrative
            </h3>
            <p className="font-editorial text-xl sm:text-2xl text-[#1C1A18] leading-relaxed italic border-l-2 border-[#D9B477] pl-4 mb-4">
              "{story.excerpt}"
            </p>
            <p className="font-sans text-sm sm:text-base text-[#1C1A18]/85 leading-relaxed">
              {story.fullStory}
            </p>
          </div>

          {/* Highlights */}
          <div className="bg-[#211E1A]/5 rounded-lg p-6 border border-[#211E1A]/10">
            <h4 className="text-xs font-sans tracking-[0.22em] uppercase text-[#1C1A18] font-bold mb-4">
              Celebration Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {story.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#1C1A18]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#D9B477] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Film Technical Notes if available */}
          {story.filmDuration && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded bg-[#211E1A] text-[#F7F3EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D9B477]/20 flex items-center justify-center text-[#D9B477]">
                  <Film className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-sans font-semibold tracking-wider text-[#F7F3EC]">
                    Feature Wedding Film
                  </p>
                  <p className="text-[11px] text-[#8D857A]">
                    {story.filmNote}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#D9B477] font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Runtime: {story.filmDuration}</span>
              </div>
            </div>
          )}

          {/* Story Photo Moments */}
          <div>
            <h4 className="text-xs font-sans tracking-[0.22em] uppercase text-[#8D857A] mb-4">
              Selected Frames From This Story
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {story.galleryImages.map((img, idx) => (
                <div key={idx} className="group relative rounded overflow-hidden bg-[#211E1A]">
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[#211E1A] text-[11px] text-[#F7F3EC]/80 font-sans italic">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-6 border-t border-[#1C1A18]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8D857A]">
              Planning a wedding in a similar setting? Let’s check availability.
            </p>
            <button
              id={`story-inquire-${story.id}`}
              type="button"
              onClick={() => {
                onInquireAboutStory(story.title);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#211E1A] text-[#F7F3EC] hover:bg-[#D9B477] hover:text-[#211E1A] transition-colors text-xs uppercase tracking-[0.18em] font-semibold rounded-[2px]"
            >
              <span>PLAN A WEDDING LIKE THIS</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
