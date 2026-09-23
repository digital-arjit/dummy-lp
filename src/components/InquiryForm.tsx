/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  UserRound,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { FormField } from './inquiry/FormField';
import { TextInput } from './inquiry/TextInput';
import { PhoneInput } from './inquiry/PhoneInput';
import { DatePicker } from './inquiry/DatePicker';
import { BudgetSelect } from './inquiry/BudgetSelect';
import { TextareaField } from './inquiry/TextareaField';
import { SubmitButton } from './inquiry/SubmitButton';
import { INQUIRY_IMAGE, BUDGET_OPTIONS } from '../data/weddingData';
import { InquiryFormData } from '../types';

interface InquiryFormProps {
  prefilledStoryNote?: string;
}

// =========================================================================
// 5. GOOGLE SHEETS INTEGRATION CONFIGURATION
// Keep the endpoint in this one clearly identifiable configuration variable
// =========================================================================
const GOOGLE_SHEETS_ENDPOINT =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbxcWKF_CwY0HYtUjMObiLFXDaMbyWCXo4JyW2CbhJt7B1b_VFOV6lE_Kz17yzJzbypL/exec';

// Converts YYYY-MM-DD to DD-MM-YY for user confirmation display
function formatIsoToDDMMYY(iso: string): string {
  if (!iso) return '';
  const parts = iso.trim().split('-');
  if (parts.length === 3) {
    const [y, m, d] = parts;
    return `${d.padStart(2, '0')}-${m.padStart(2, '0')}-${y.slice(-2)}`;
  }
  return iso;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ prefilledStoryNote }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    phone: '',
    email: '',
    weddingDate: '',
    location: '',
    budget: '',
    description: prefilledStoryNote ? `Inspired by: ${prefilledStoryNote}` : '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    phone: string;
    email: string;
    date: string;
    location: string;
    budget: string;
  } | null>(null);

  // Phone validation (Supporting Indian numbers with optional +91, 91, 0, spaces and hyphens)
  const validatePhone = (rawPhone: string): string | null => {
    const trimmed = rawPhone.trim();
    if (!trimmed) {
      return 'Phone / WhatsApp number is required.';
    }

    const clean = trimmed.replace(/[\s\-()]/g, '');
    const indianMobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
    const internationalRegex = /^\+?[1-9]\d{9,14}$/;

    if (!indianMobileRegex.test(clean) && !internationalRegex.test(clean)) {
      return 'Please enter a valid phone number (e.g. +91 98765 43210).';
    }

    return null;
  };

  // Optional email format validation
  const validateEmail = (email: string): string | null => {
    const trimmed = email.trim();
    if (!trimmed) return null; // Email is optional

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address.';
    }
    return null;
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};

    // 1. Full Name (Required)
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please provide your full name.';
    }

    // 2. Phone / WhatsApp (Required)
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    // 3. Email (Optional, validated only if entered)
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // 4. Wedding Date (Required)
    if (!formData.weddingDate.trim()) {
      newErrors.weddingDate = 'Please select or enter your wedding date.';
    }

    // 5. Wedding Location / City (Required)
    if (!formData.location.trim()) {
      newErrors.location = 'Please share your wedding destination or city.';
    }

    // 6. Estimated Photography Budget (Required)
    if (!formData.budget.trim()) {
      newErrors.budget = 'Please select an estimated photography budget tier.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions
    setSubmitError(null);

    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.getElementById(`field-${firstErrorKey}`);
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    const resolvedBudgetLabel =
      BUDGET_OPTIONS.find((b) => b.value === formData.budget)?.label || formData.budget;
    const formattedDisplayDate = formatIsoToDDMMYY(formData.weddingDate);

    // Prepare exact URLSearchParams for Google Apps Script doPost(e) -> e.parameter
    const params = new URLSearchParams();
    params.append('fullName', formData.fullName.trim());
    params.append('phone', formData.phone.trim());
    params.append('email', formData.email.trim());
    params.append('weddingDate', formData.weddingDate.trim()); // Internal YYYY-MM-DD
    params.append('location', formData.location.trim());
    params.append('budget', formData.budget.trim()); // Machine-readable value
    params.append('description', (formData.description || formData.notes || '').trim());
    // Also append budget label and formatted display date for Google Sheets readability
    params.append('budgetLabel', resolvedBudgetLabel);
    params.append('weddingDateDisplay', formattedDisplayDate);

    let isDelivered = false;
    let failureDetail: string | null = null;

    try {
      // Append query parameters so e.parameter in Google Apps Script is populated
      // even when browser redirects cross-origin
      const targetUrl = new URL(GOOGLE_SHEETS_ENDPOINT);
      params.forEach((value, key) => {
        targetUrl.searchParams.set(key, value);
      });

      // Send HTTP POST with URLSearchParams in body and query params
      // mode: 'no-cors' allows dispatching to Google Apps Script without CORS blocking
      await fetch(targetUrl.toString(), {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: params.toString(),
      });

      isDelivered = true;
    } catch (fetchErr: any) {
      try {
        // Fallback attempt: Standard POST
        const fallbackRes = await fetch(GOOGLE_SHEETS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: params.toString(),
        });
        if (fallbackRes.ok || fallbackRes.type === 'opaque') {
          isDelivered = true;
        } else {
          failureDetail = `Google Sheets endpoint returned status ${fallbackRes.status}.`;
        }
      } catch (noCorsErr: any) {
        failureDetail =
          'Network error: Unable to transmit your inquiry to Google Sheets. Please check your internet connection or reach out on WhatsApp.';
      }
    }

    setIsSubmitting(false);

    if (isDelivered) {
      const generatedRef = `FF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setReferenceId(generatedRef);
      setSubmittedSummary({
        name: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        date: formattedDisplayDate,
        location: formData.location.trim(),
        budget: resolvedBudgetLabel,
      });

      // Clear the form only after confirmed success
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        weddingDate: '',
        location: '',
        budget: '',
        description: '',
      });
      setErrors({});
      setIsSuccess(true);
    } else {
      // Preserve form values if submission fails
      setSubmitError(
        failureDetail ||
          'Unable to send inquiry to Google Sheets. Please verify your connection or reach out directly.'
      );
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubmittedSummary(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      weddingDate: '',
      location: '',
      budget: '',
      description: '',
    });
    setErrors({});
    setSubmitError(null);
  };

  return (
    <section
      id="inquiry"
      className="relative py-24 lg:py-32 bg-[#211E1A] text-[#F7F3EC] overflow-hidden"
      aria-label="Wedding Date Inquiry and Booking"
    >
      {/* Background with Dark Cinematic Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={INQUIRY_IMAGE.url}
          alt={INQUIRY_IMAGE.alt}
          loading="lazy"
          className="w-full h-full object-cover opacity-15 filter saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171513] via-[#211E1A]/95 to-[#211E1A]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D9B477]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#D9B477]">
              AVAILABILITY & INQUIRY
            </span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F3EC] tracking-tight mb-4">
            LET’S CHECK YOUR DATE
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#8D857A] leading-relaxed">
            Tell us a little about your celebration, and let’s see how we can be part of your story.
            We strictly accept a limited number of weddings each season to guarantee undivided artistic attention.
          </p>

          <div className="w-12 h-[1px] bg-[#D9B477] mx-auto mt-6" />
        </div>

        {/* Form Container */}
        {isSuccess && submittedSummary ? (
          <div
            id="inquiry-success-banner"
            className="bg-[#1D1A17] border border-[#D9B477]/40 rounded-[2px] p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl animate-in zoom-in-95 duration-400"
          >
            <div className="w-16 h-16 rounded-full bg-[#D9B477]/15 border border-[#D9B477] flex items-center justify-center text-[#D9B477] mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>

            <h3 className="font-editorial text-3xl sm:text-4xl text-[#F7F3EC] font-light mb-2">
              Thank You, {submittedSummary.name.split(' ')[0]}!
            </h3>

            <p className="font-editorial italic text-lg sm:text-xl text-[#D9B477] mb-6">
              Your celebration inquiry has been securely sent to our studio.
            </p>

            <div className="bg-[#211E1A] p-5 rounded-[2px] border border-[rgba(217,180,119,0.3)] max-w-md mx-auto mb-6 text-xs text-[#8D857A] space-y-2 text-left font-sans">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-[#8D857A]">Reference Code:</span>
                <span className="text-[#D9B477] font-mono font-semibold">{referenceId}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-[#8D857A]">Wedding Date:</span>
                <span className="text-[#F7F3EC]">{submittedSummary.date}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span className="text-[#8D857A]">Location:</span>
                <span className="text-[#F7F3EC]">{submittedSummary.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8D857A]">Estimated Budget:</span>
                <span className="text-[#F7F3EC]">{submittedSummary.budget}</span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[#F7F3EC]/80 leading-relaxed mb-8 max-w-lg mx-auto">
              Our studio director will review our filming calendar for your date and reach out via WhatsApp / phone ({submittedSummary.phone})
              {submittedSummary.email && ` or email (${submittedSummary.email})`} within 24 hours.
            </p>

            <button
              id="inquiry-reset-btn"
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#D9B477] text-[#D9B477] hover:bg-[#D9B477] hover:text-[#211E1A] text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-colors rounded-[2px] cursor-pointer"
            >
              <span>SUBMIT ANOTHER DATE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form
            id="wedding-inquiry-form"
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#211E1A] rounded-[2px] p-6 sm:p-10 lg:p-12 border border-[rgba(217,180,119,0.3)] shadow-2xl space-y-6 lg:space-y-8"
          >
            {submitError && (
              <div
                role="alert"
                className="p-4 bg-red-950/40 border border-red-500/40 text-red-300 text-xs rounded-[2px] flex items-center gap-2 font-sans"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Desktop Two-Column Grid matching reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Row 1, Col 1: FULL NAME * */}
              <FormField
                id="field-fullName"
                label="FULL NAME"
                required
                error={errors.fullName}
              >
                <TextInput
                  id="field-fullName"
                  name="fullName"
                  icon={UserRound}
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                  }}
                  placeholder="Name"
                  hasError={Boolean(errors.fullName)}
                  autoComplete="name"
                  aria-required="true"
                />
              </FormField>

              {/* Row 1, Col 2: PHONE / WHATSAPP * */}
              <FormField
                id="field-phone"
                label="PHONE / WHATSAPP"
                required
                error={errors.phone}
              >
                <PhoneInput
                  id="field-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: undefined });
                  }}
                  placeholder="Phone"
                  hasError={Boolean(errors.phone)}
                  aria-required="true"
                />
              </FormField>

              {/* Row 2, Col 1: EMAIL ADDRESS (Optional, no asterisk) */}
              <FormField
                id="field-email"
                label="EMAIL ADDRESS"
                required={false}
                error={errors.email}
              >
                <TextInput
                  id="field-email"
                  name="email"
                  icon={Mail}
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="Email"
                  hasError={Boolean(errors.email)}
                  autoComplete="email"
                />
              </FormField>

              {/* Row 2, Col 2: WEDDING DATE * */}
              <FormField
                id="field-weddingDate"
                label="WEDDING DATE"
                required
                error={errors.weddingDate}
              >
                <DatePicker
                  id="field-weddingDate"
                  name="weddingDate"
                  placeholder="Date"
                  value={formData.weddingDate}
                  onChange={(iso) => {
                    setFormData({ ...formData, weddingDate: iso });
                    if (errors.weddingDate) setErrors({ ...errors, weddingDate: undefined });
                  }}
                  hasError={Boolean(errors.weddingDate)}
                />
              </FormField>

              {/* Row 3, Col 1: WEDDING LOCATION / CITY * */}
              <FormField
                id="field-location"
                label="WEDDING LOCATION / CITY"
                required
                error={errors.location}
              >
                <TextInput
                  id="field-location"
                  name="location"
                  icon={MapPin}
                  type="text"
                  value={formData.location}
                  onChange={(e) => {
                    setFormData({ ...formData, location: e.target.value });
                    if (errors.location) setErrors({ ...errors, location: undefined });
                  }}
                  placeholder="Location"
                  hasError={Boolean(errors.location)}
                  aria-required="true"
                />
              </FormField>

              {/* Row 3, Col 2: ESTIMATED PHOTOGRAPHY BUDGET * */}
              <FormField
                id="field-budget"
                label="ESTIMATED PHOTOGRAPHY BUDGET"
                required
                error={errors.budget}
              >
                <BudgetSelect
                  id="field-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={(value) => {
                    setFormData({ ...formData, budget: value });
                    if (errors.budget) setErrors({ ...errors, budget: undefined });
                  }}
                  hasError={Boolean(errors.budget)}
                />
              </FormField>

              {/* Row 4: TELL US ABOUT YOUR WEDDING (OPTIONAL) - Full Width */}
              <div className="md:col-span-2">
                <FormField
                  id="field-description"
                  label="TELL US ABOUT YOUR WEDDING (OPTIONAL)"
                  required={false}
                >
                  <TextareaField
                    id="field-description"
                    name="description"
                    value={formData.description || formData.notes || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value, notes: e.target.value })
                    }
                    maxLength={1000}
                    placeholder="Description"
                  />
                </FormField>
              </div>
            </div>

            {/* Bottom Row: Privacy Assurance & Submit Button */}
            <div className="pt-4 border-t border-[rgba(217,180,119,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-[#8D857A] font-sans tracking-wide text-center sm:text-left">
                🔒 We respect your privacy. No spam or unsolicited calls, ever.
              </p>

              <SubmitButton
                id="inquiry-submit-btn"
                isSubmitting={isSubmitting}
              />
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

