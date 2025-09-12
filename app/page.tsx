'use client';
import Header from'@/components/common/Header';
 import Footer from'@/components/common/Footer';
import HeroSection from '@/landing-page/HeroSection';
import FeaturesSection from '@/landing-page/FeaturesSection';
import PricingSection from '@/landing-page/PricingSection';
import TestimonialSection from '@/landing-page/TestimonialSection';
import CTASection from '@/landing-page/CTASection';

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default HomePage