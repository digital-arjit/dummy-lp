/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required = false,
  error,
  className = '',
  children,
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label
        htmlFor={id}
        className="block text-[11px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#D8D0C6] font-medium"
      >
        {label} {required && <span className="text-[#D9B477] font-bold">*</span>}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs text-red-400 flex items-center gap-1.5 pt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
