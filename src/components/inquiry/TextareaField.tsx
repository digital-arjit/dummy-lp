/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  maxLength?: number;
  value: string;
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  name = 'description',
  maxLength = 1000,
  value,
  onChange,
  className = '',
  placeholder = 'Description',
  ...props
}) => {
  const currentLength = value ? value.length : 0;

  return (
    <div className="space-y-1.5">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        rows={4}
        placeholder={placeholder}
        className={`w-full min-h-[110px] p-4 bg-[#1D1A17] text-[#F7F3EC] text-sm font-sans placeholder-[#8D857A] rounded-[2px] border border-[rgba(217,180,119,0.3)] hover:border-[#D9B477]/60 focus:border-[#D9B477] focus:ring-1 focus:ring-[#D9B477] focus:outline-none transition-colors resize-y leading-relaxed ${className}`}
        {...props}
      />

      <div className="flex justify-end text-[11px] text-[#8D857A] font-sans pr-1">
        <span>
          {currentLength.toLocaleString()} / {maxLength.toLocaleString()} characters
        </span>
      </div>
    </div>
  );
};
