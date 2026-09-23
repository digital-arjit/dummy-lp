/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Loader2, ArrowRight } from 'lucide-react';

interface SubmitButtonProps {
  id?: string;
  isSubmitting: boolean;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  id = 'inquiry-submit-btn',
  isSubmitting,
  className = '',
}) => {
  return (
    <button
      id={id}
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting}
      className={`w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#D9B477] text-[#211E1A] hover:bg-[#C5A062] active:bg-[#B89354] font-sans text-xs tracking-[0.2em] uppercase font-bold rounded-[2px] transition-all duration-300 shadow-xl shadow-[#D9B477]/10 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer ${className}`}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-[#211E1A]" aria-hidden="true" />
          <span>CHECKING AVAILABILITY...</span>
        </>
      ) : (
        <>
          <span>CHECK AVAILABILITY</span>
          <ArrowRight
            className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200 text-[#211E1A]"
            aria-hidden="true"
          />
        </>
      )}
    </button>
  );
};
