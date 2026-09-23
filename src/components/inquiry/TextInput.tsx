/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  icon?: LucideIcon;
  hasError?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  icon: Icon,
  hasError = false,
  className = '',
  ...props
}) => {
  return (
    <div className="relative flex items-center">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#D9B477]">
          <Icon className="w-[19px] h-[19px]" aria-hidden="true" />
        </div>
      )}

      <input
        id={id}
        {...props}
        className={`w-full h-14 ${
          Icon ? 'pl-12' : 'pl-4'
        } pr-4 bg-[#1D1A17] text-[#F7F3EC] text-sm font-sans placeholder-[#8D857A] rounded-[2px] border transition-colors focus:outline-none focus:ring-1 focus:ring-[#D9B477] ${
          hasError
            ? 'border-red-400 focus:border-red-400'
            : 'border-[rgba(217,180,119,0.3)] hover:border-[#D9B477]/60 focus:border-[#D9B477]'
        } ${className}`}
      />
    </div>
  );
};
