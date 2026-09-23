/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type GalleryCategory = 'ALL' | 'CANDID' | 'CEREMONIES' | 'PORTRAITS' | 'FILMS';

export interface FeaturedStory {
  id: string;
  title: string;
  location: string;
  category: string;
  coupleNames: string;
  date: string;
  coverImage: string;
  excerpt: string;
  fullStory: string;
  highlights: string[];
  galleryImages: {
    url: string;
    caption: string;
  }[];
  filmDuration?: string;
  filmNote?: string;
}

export interface WhyChooseUsItem {
  id: string;
  iconName: 'Camera' | 'Film' | 'Heart';
  heading: string;
  description: string;
  detail: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'CANDID' | 'CEREMONIES' | 'PORTRAITS' | 'FILMS';
  location: string;
  imageUrl: string;
  aspect: 'tall' | 'wide' | 'square';
  caption: string;
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  coupleNames: string;
  location: string;
  weddingDate: string;
  coverPhoto: string;
}

export interface InquiryFormData {
  fullName: string;
  phone: string;
  email: string;
  weddingDate: string;
  location: string;
  budget: string;
  services?: string[];
  notes?: string;
  description: string;
}
