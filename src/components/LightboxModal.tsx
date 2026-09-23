/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Tag } from 'lucide-react';
import { PortfolioItem } from '../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onNavigate: (newItem: PortfolioItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && item) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && item) {
        handlePrev();
      }
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, items]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      onNavigate(items[currentIndex + 1]);
    } else {
      onNavigate(items[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(items[currentIndex - 1]);
    } else {
      onNavigate(items[items.length - 1]);
    }
  };

  return (
    <div
      id="lightbox-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#171513]/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        id="lightbox-close"
        onClick={onClose}
        type="button"
        className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-[#211E1A]/80 text-[#F7F3EC] hover:text-[#D9B477] flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#D9B477]"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Navigation */}
      <button
        id="lightbox-prev"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        type="button"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#211E1A]/60 text-[#F7F3EC] hover:bg-[#D9B477] hover:text-[#211E1A] flex items-center justify-center transition-colors shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next Navigation */}
      <button
        id="lightbox-next"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        type="button"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#211E1A]/60 text-[#F7F3EC] hover:bg-[#D9B477] hover:text-[#211E1A] flex items-center justify-center transition-colors shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox Content Container */}
      <div
        id="lightbox-content"
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
      >
        <div className="relative w-full flex items-center justify-center overflow-hidden rounded-md shadow-2xl bg-[#211E1A]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-md"
          />
        </div>

        {/* Lightbox Caption Strip */}
        <div className="w-full mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-2 text-[#F7F3EC]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-[#D9B477] text-[#211E1A] font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {item.category}
              </span>
              <span className="text-xs text-[#8D857A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D9B477]" />
                {item.location}
              </span>
            </div>
            <h3 className="font-editorial text-xl sm:text-2xl text-[#F7F3EC]">
              {item.title}
            </h3>
            <p className="font-sans text-xs text-[#8D857A] max-w-xl italic">
              {item.caption}
            </p>
          </div>

          <div className="text-xs font-mono text-[#D9B477] self-end sm:self-center">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
