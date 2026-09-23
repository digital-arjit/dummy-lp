/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  id: string;
  name?: string;
  value: string; // Stored internally as YYYY-MM-DD
  onChange: (isoDate: string) => void;
  hasError?: boolean;
  placeholder?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Convert YYYY-MM-DD to DD-MM-YY
function formatIsoToDisplay(iso: string): string {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    const shortYear = year.length === 4 ? year.slice(-2) : year;
    return `${day}-${month}-${shortYear}`;
  }
  return iso;
}

// Parse DD-MM-YY or DD-MM-YYYY to YYYY-MM-DD
function parseDisplayToIso(display: string): string | null {
  const clean = display.trim();
  const match = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})$/);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  let year = parseInt(match[3], 10);

  if (year < 100) {
    year += 2000;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return null;
  }

  const yyyy = year.toString();
  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  id,
  name = 'weddingDate',
  value,
  onChange,
  hasError = false,
  placeholder = 'Date',
}) => {
  const [displayText, setDisplayText] = useState(() => formatIsoToDisplay(value));
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize calendar view date
  const initialDate = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(
    isNaN(initialDate.getTime()) ? new Date().getFullYear() : initialDate.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    isNaN(initialDate.getTime()) ? new Date().getMonth() : initialDate.getMonth()
  );

  // Synchronize when external value changes
  useEffect(() => {
    setDisplayText(formatIsoToDisplay(value));
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    }
  }, [value]);

  // Close calendar on outside click or Escape
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleDocumentClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleDisplayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setDisplayText(raw);

    const parsedIso = parseDisplayToIso(raw);
    if (parsedIso) {
      onChange(parsedIso);
      const parsedDate = new Date(parsedIso);
      if (!isNaN(parsedDate.getTime())) {
        setViewYear(parsedDate.getFullYear());
        setViewMonth(parsedDate.getMonth());
      }
    } else if (raw === '') {
      onChange('');
    }
  };

  const handleSelectDate = (year: number, month: number, day: number) => {
    const yyyy = String(year);
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const iso = `${yyyy}-${mm}-${dd}`;

    onChange(iso);
    setDisplayText(formatIsoToDisplay(iso));
    setIsOpen(false);
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Calendar calculations
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sunday

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === viewYear && today.getMonth() === viewMonth;
  const currentDay = today.getDate();

  // Selected date components
  let selectedYear: number | null = null;
  let selectedMonth: number | null = null;
  let selectedDay: number | null = null;
  if (value) {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      selectedYear = parsed.getFullYear();
      selectedMonth = parsed.getMonth();
      selectedDay = parsed.getDate();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative flex items-center">
        {/* Visible Input */}
        <input
          id={id}
          name={name}
          type="text"
          value={displayText}
          onChange={handleDisplayChange}
          onClick={() => setIsOpen(true)}
          placeholder={placeholder}
          aria-label="Wedding Date"
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={`w-full h-14 pl-4 pr-14 bg-[#1D1A17] text-[#F7F3EC] text-sm font-sans placeholder-[#8D857A] rounded-[2px] border transition-colors focus:outline-none focus:ring-1 focus:ring-[#D9B477] cursor-pointer ${
            hasError
              ? 'border-red-400 focus:border-red-400'
              : 'border-[rgba(217,180,119,0.3)] hover:border-[#D9B477]/60 focus:border-[#D9B477]'
          }`}
        />

        {/* Calendar Button on the right side */}
        <button
          type="button"
          id={`${id}-calendar-btn`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Open calendar date picker"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#D9B477] hover:text-[#C5A062] focus:outline-none focus:ring-1 focus:ring-[#D9B477] rounded-r-[2px] transition-colors cursor-pointer"
        >
          <CalendarDays className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Interactive Luxury Dropdown Calendar */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Choose Wedding Date"
          className="absolute z-50 top-full mt-2 left-0 sm:w-80 w-full bg-[#1D1A17] border border-[#D9B477]/40 rounded-[2px] p-4 shadow-2xl backdrop-blur-md animate-in fade-in-50 zoom-in-95 duration-200"
        >
          {/* Header with Navigation */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D9B477]/15">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="p-1.5 rounded text-[#D9B477] hover:bg-[#D9B477]/15 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-editorial text-base text-[#F7F3EC] font-normal tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="p-1.5 rounded text-[#D9B477] hover:bg-[#D9B477]/15 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="text-[11px] font-sans font-semibold tracking-wider text-[#D9B477]/80 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Empty slots before day 1 */}
            {Array.from({ length: firstDayIndex }).map((_, index) => (
              <div key={`empty-${index}`} className="h-8" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isSelected =
                selectedYear === viewYear &&
                selectedMonth === viewMonth &&
                selectedDay === day;
              const isToday = isCurrentMonth && currentDay === day;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleSelectDate(viewYear, viewMonth, day)}
                  className={`h-8 w-8 mx-auto flex items-center justify-center rounded-[2px] text-xs font-sans transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#D9B477] text-[#211E1A] font-bold shadow-md shadow-[#D9B477]/30 scale-105'
                      : isToday
                      ? 'border border-[#D9B477] text-[#D9B477] font-semibold hover:bg-[#D9B477]/20'
                      : 'text-[#F7F3EC] hover:bg-[#D9B477]/15 hover:text-[#D9B477]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Footer with Today & Clear */}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#D9B477]/15 text-[11px] font-sans">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                handleSelectDate(now.getFullYear(), now.getMonth(), now.getDate());
              }}
              className="text-[#D9B477] hover:underline cursor-pointer tracking-wider uppercase font-semibold"
            >
              Today
            </button>

            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setDisplayText('');
                  setIsOpen(false);
                }}
                className="text-[#8D857A] hover:text-[#F7F3EC] cursor-pointer"
              >
                Clear
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#8D857A] hover:text-[#D9B477] cursor-pointer tracking-wider uppercase"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
