/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeaturedStory, WhyChooseUsItem, PortfolioItem, ApproachStep, Testimonial } from '../types';

export const BRAND_INFO = {
  name: 'FOREVER FRAMES',
  tagline: 'WEDDING PHOTOGRAPHY & FILMS',
  philosophy: 'Your wedding is a once-in-a-lifetime story, and we preserve it with emotion, artistry, and intention.',
  phone: '+91 98765 43210',
  email: 'hello@foreverframes.com',
  locations: 'Mumbai & New Delhi • Available Worldwide',
  experienceYears: '12+',
  weddingsCaptured: '350+',
  countriesTraveled: '18',
};

// Hero background image
export const HERO_IMAGE = {
  url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=2000&auto=format&fit=crop',
  alt: 'Indian bride and groom in an intimate royal golden-hour moment',
  photographer: 'Forever Frames Studio',
};

// Approach feature image
export const APPROACH_IMAGE = {
  url: 'https://images.unsplash.com/photo-1595956553066-fe24a8c33395?q=80&w=1200&auto=format&fit=crop',
  alt: 'Indian bride in royal heritage palace corridor during wedding preparations',
};

// Inquiry background image
export const INQUIRY_IMAGE = {
  url: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?q=80&w=2000&auto=format&fit=crop',
  alt: 'Warm evening wedding celebration with fairy lights and heritage palace ambiance',
};

export const FEATURED_STORIES: FeaturedStory[] = [
  {
    id: 'udaipur-celebration',
    title: 'A Celebration in Udaipur',
    location: 'Lake Pichola, Udaipur',
    category: 'ROYAL PALACE',
    coupleNames: 'Riya & Arjun',
    date: 'December 2025',
    coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Three days of royal festivities on the shores of Lake Pichola, culminating in an ethereal twilight pheras ceremony bathed in floating lotus lamps.',
    fullStory: 'Riya and Arjun dreamed of a wedding that blended Rajasthan’s majestic heritage with intimate, heartfelt warmth. From an exuberant mehendi filled with folk musicians along the marble courtyards to a midnight pheras where the calm waters reflected thousand flickering diyas, we documented every tender glance, tearful blessing, and unscripted burst of laughter.',
    highlights: [
      'Sunset varmala on a floating palace pavilion',
      'Acoustic folk music under hand-embroidered shamianas',
      'Unposed portraits amidst historic Mewar archways',
      'Emotion-drenched father-daughter vidai at sunrise'
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
        caption: 'The sunset royal portrait along the Udaipur palace balcony.'
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
        caption: 'Intricate bridal details & heirloom jewelry adorned before the ceremony.'
      },
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
        caption: 'Emotional embrace during the twilight pheras ceremony.'
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
        caption: 'Quiet unscripted exchange as the celebration gathered speed.'
      }
    ],
    filmDuration: '14 mins 20 secs',
    filmNote: 'Shot on Arri Alexa Mini & vintage anamorphic lenses'
  },
  {
    id: 'mountain-wedding',
    title: 'An Intimate Mountain Wedding',
    location: 'Mashobra, Himachal Pradesh',
    category: 'DESTINATION HIMALAYAS',
    coupleNames: 'Tarini & Kabir',
    date: 'November 2025',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Surrounded by deodar pine forests and crisp Himalayan fog, eighty cherished guests gathered for a soulful, rustic mountain union.',
    fullStory: 'Tarini and Kabir chose the silence of pine canopies over high-decibel banquet halls. Their ceremony featured a simple mandap woven with local wild pine, marigold, and raw cedar wood. We let the natural Himalayan sunlight, the drifting cedar smoke, and spontaneous mountain winds frame their intimate vows.',
    highlights: [
      'Morning prayer ceremony overlooking snow-clad peaks',
      'Wildflower and marigold mandap crafted with local artisans',
      'Candid laughter over steaming saffron kehwa around twilight bonfires',
      'Pine forest couple walk in soft morning mist'
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
        caption: 'Golden mountain hour framing their first walk as husband and wife.'
      },
      {
        url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop',
        caption: 'Unrehearsed laughter during family forest brunch.'
      },
      {
        url: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=1000&auto=format&fit=crop',
        caption: 'Bonfire warmth and acoustic celebration in the mountain dusk.'
      }
    ],
    filmDuration: '11 mins 45 secs',
    filmNote: 'Score composed with authentic Pahadi flute and warm acoustic strings'
  },
  {
    id: 'modern-celebration',
    title: 'A Modern Indian Celebration',
    location: 'South Mumbai & Alibaug',
    category: 'CONTEMPORARY CHIC',
    coupleNames: 'Meera & Dev',
    date: 'February 2026',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'An architectural coastal sanctuary hosted a high-energy Sangeet and an ethereal minimalist sunset ceremony with timeless understated elegance.',
    fullStory: 'Meera and Dev paired clean mid-century aesthetics with vibrant Indian ceremonial rituals. A beachside Haldi turned into an euphoric floral splash, followed by a dramatic Sangeet drenched in amber spotlights and contemporary jazz infusions. Our team focused on honest reportage and filmic portraits.',
    highlights: [
      'Minimalist ivory & brass floral mandap against the Arabian Sea',
      'Vibrant organic flower petal Haldi overlooking the ocean',
      'Sangeet after-party with vintage film roll snapshots',
      'Private sunset vow exchange before the grand baraat'
    ],
    galleryImages: [
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
        caption: 'Modern minimalism meets timeless wedding elegance.'
      },
      {
        url: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1000&auto=format&fit=crop',
        caption: 'Intimate evening toast under amber chandeliers.'
      },
      {
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
        caption: 'Candid look between the couple before walking down the aisle.'
      }
    ],
    filmDuration: '16 mins 10 secs',
    filmNote: 'Edited in 2.39:1 cinemascope ratio with analog color grading'
  }
];

export const WHY_CHOOSE_US_DATA: WhyChooseUsItem[] = [
  {
    id: 'candid',
    iconName: 'Camera',
    heading: 'CANDID',
    description: 'Real moments. Unposed. Always authentic.',
    detail: 'We quietly blend into your celebrations, catching the fleeting tears, suppressed giggles, and stolen looks without interrupting the sanctity of the ritual.'
  },
  {
    id: 'cinematic',
    iconName: 'Film',
    heading: 'CINEMATIC',
    description: 'Story-driven films with a cinematic touch.',
    detail: 'Not merely chronological video montages. We compose true cinematic documentaries with intentional soundscapes, color grading, and evocative pacing.'
  },
  {
    id: 'personal',
    iconName: 'Heart',
    heading: 'PERSONAL',
    description: 'We get to know you, because your story matters.',
    detail: 'We invest time months before your wedding getting to know your dynamics, family elders, and personal quirks so our cameras feel like lifelong friends.'
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'The Royal Varmala',
    category: 'CEREMONIES',
    location: 'City Palace, Jaipur',
    imageUrl: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Exchange of fragrant rose garlands beneath historic carved sandstone arches at twilight.'
  },
  {
    id: 'port-2',
    title: 'Stolen Whisper in the Courtyard',
    category: 'CANDID',
    location: 'Udaipur, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop',
    aspect: 'square',
    caption: 'An unscripted moment of laughter shared right before the baraat arrival.'
  },
  {
    id: 'port-3',
    title: 'Heritage Bridal Portrait',
    category: 'PORTRAITS',
    location: 'Taj Falaknuma Palace, Hyderabad',
    imageUrl: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=1200&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Exquisite bridal adornment with heirloom polki jewels and fresh jasmine blossoms.'
  },
  {
    id: 'port-4',
    title: 'The Sacred Agni Pheras',
    category: 'CEREMONIES',
    location: 'Rishikesh, Uttarakhand',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Seven sacred vows encircled by holy Vedic chants alongside the Ganges river.'
  },
  {
    id: 'port-5',
    title: 'Echoes of Joy — Cinematic Still',
    category: 'FILMS',
    location: 'Alila Fort Bishangarh',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=1200&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'Cinema still from Meera & Dev’s feature wedding film, graded in warm analog tones.'
  },
  {
    id: 'port-6',
    title: 'A Mother’s Blessing',
    category: 'CANDID',
    location: 'New Delhi',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000&auto=format&fit=crop',
    aspect: 'square',
    caption: 'Tearful, quiet tenderness during the final chooda ceremony.'
  },
  {
    id: 'port-7',
    title: 'Dusk at the Lake Pavilion',
    category: 'PORTRAITS',
    location: 'Lake Pichola, Udaipur',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    aspect: 'tall',
    caption: 'Couple portrait as twilight settles over shimmering lakeside marble.'
  },
  {
    id: 'port-8',
    title: 'Midnight Revelry & Sparklers',
    category: 'FILMS',
    location: 'Goa',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    aspect: 'wide',
    caption: 'An exuberant beach reception send-off illuminated by a hundred sparklers.'
  }
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: '01',
    title: 'GETTING TO KNOW YOU',
    description: 'We begin by understanding your story, your people, and the moments that matter most.',
    detail: 'We schedule private coffee dates or video sessions to discover what makes your bond unique, which family members are sentimental, and what memories you cherish most.'
  },
  {
    number: '02',
    title: 'CAPTURING THE UNEXPECTED',
    description: 'From quiet glances to loud celebrations, we document your wedding naturally and intentionally.',
    detail: 'No intrusive staging, no asking you to repeat sacred rites. We observe quietly with telephoto lenses and natural light, anticipating tears and laughter before they happen.'
  },
  {
    number: '03',
    title: 'CRAFTING YOUR MEMORIES',
    description: 'Every image and film is thoughtfully refined to preserve the feeling of your day.',
    detail: 'Color-graded with our bespoke cinematic palettes, matched with artisanal music scores, and curated into handcrafted heirloom albums designed to last generations.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    quote: 'They didn’t just capture our wedding, they captured our emotions. Every photo feels like a memory we can relive forever.',
    coupleNames: 'Riya & Arjun',
    location: 'Udaipur Palace Wedding',
    weddingDate: 'December 2025',
    coverPhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 't-2',
    quote: 'Forever Frames became like family during those four days. Looking through our wedding film brings happy tears every single anniversary.',
    coupleNames: 'Ananya & Kabir',
    location: 'Mashobra Mountain Retreat',
    weddingDate: 'November 2025',
    coverPhoto: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 't-3',
    quote: 'Our cinematic film is breathtaking. The pacing, the soulful soundtrack, the unscripted hugs from our grandparents—pure timeless poetry.',
    coupleNames: 'Meera & Dev',
    location: 'Alibaug Beach Celebration',
    weddingDate: 'February 2026',
    coverPhoto: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop'
  }
];

export const SERVICE_OPTIONS = [
  'Candid Photography',
  'Cinematic Wedding Film',
  'Pre-Wedding Concept Shoot',
  'Traditional Ritual Coverage',
  'Drone Aerial Cinematography',
  'Handcrafted Fine-Art Album'
];

export interface BudgetOption {
  value: string;
  label: string;
}

export const BUDGET_OPTIONS: BudgetOption[] = [
  { value: '100000-250000', label: '₹1,00,000 – ₹2,50,000' },
  { value: '250000-400000', label: '₹2,50,000 – ₹4,00,000' },
  { value: '400000-600000', label: '₹4,00,000 – ₹6,00,000' },
  { value: '600000-plus', label: '₹6,00,000+' },
];

export const BUDGET_TIERS = [
  '₹1,00,000 – ₹2,50,000',
  '₹2,50,000 – ₹4,00,000',
  '₹4,00,000 – ₹6,00,000',
  '₹6,00,000+',
];
