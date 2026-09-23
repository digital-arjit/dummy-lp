/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedStories } from './components/FeaturedStories';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PortfolioGallery } from './components/PortfolioGallery';
import { ApproachSection } from './components/ApproachSection';
import { Testimonials } from './components/Testimonials';
import { InquiryForm } from './components/InquiryForm';
import { Footer } from './components/Footer';

export default function App() {
  const [prefilledStory, setPrefilledStory] = useState<string | undefined>(undefined);

  const scrollToInquiry = () => {
    const inquirySection = document.getElementById('inquiry');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStories = () => {
    const storiesSection = document.getElementById('stories');
    if (storiesSection) {
      storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireAboutStory = (storyTitle: string) => {
    setPrefilledStory(storyTitle);
    scrollToInquiry();
  };

  return (
    <div className="min-h-screen bg-[#211E1A] text-[#F7F3EC] flex flex-col selection:bg-[#D9B477] selection:text-[#211E1A]">
      {/* Sticky Navigation Bar */}
      <Navbar onCheckDateClick={scrollToInquiry} />

      {/* Main Content Sections in Specified Order */}
      <main id="main-content" className="flex-grow">
        {/* Section 2: Hero Section */}
        <HeroSection
          onCheckDateClick={scrollToInquiry}
          onExploreStoriesClick={scrollToStories}
        />

        {/* Section 3: Featured Wedding Stories */}
        <FeaturedStories onInquireAboutStory={handleInquireAboutStory} />

        {/* Section 4: Why Couples Choose Us */}
        <WhyChooseUs />

        {/* Section 5: Selected Portfolio / Visual Gallery */}
        <PortfolioGallery />

        {/* Section 6: Our Approach / Experience */}
        <ApproachSection onCheckDateClick={scrollToInquiry} />

        {/* Section 7: Testimonials */}
        <Testimonials />

        {/* Section 8: Wedding Inquiry / Date Check Form */}
        <InquiryForm prefilledStoryNote={prefilledStory} />
      </main>

      {/* Section 9: Footer */}
      <Footer onCheckDateClick={scrollToInquiry} />
    </div>
  );
}

