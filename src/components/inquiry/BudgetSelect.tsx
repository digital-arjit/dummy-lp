/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IndianRupee, ChevronDown } from 'lucide-react';
import { BUDGET_OPTIONS } from '../../data/weddingData';

interface BudgetSelectProps {
  id: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export const BudgetSelect: React.FC<BudgetSelectProps> = ({
  id,
  name = 'budget',
  value,
  onChange,
  hasError = false,
}) => {
  return (
    <div className="relative flex items-center">
      {/* Indian Rupee Icon on Left */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D9B477]">
        <IndianRupee className="w-[19px] h-[19px]" aria-hidden="true" />
      </div>

      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-14 pl-12 pr-12 bg-[#1D1A17] text-sm font-sans rounded-[2px] border appearance-none transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#D9B477] ${
          !value ? 'text-[#8D857A]' : 'text-[#F7F3EC]'
        } ${
          hasError
            ? 'border-red-400 focus:border-red-400'
            : 'border-[rgba(217,180,119,0.3)] hover:border-[#D9B477]/60 focus:border-[#D9B477]'
        }`}
      >
        <option value="" disabled className="bg-[#1D1A17] text-[#8D857A]">
          Select your budget
        </option>
        {BUDGET_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-[#211E1A] text-[#F7F3EC] py-2"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom Dropdown Arrow on Right */}
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-[#D9B477]">
        <ChevronDown className="w-5 h-5" aria-hidden="true" />
      </div>
    </div>
  );
};
