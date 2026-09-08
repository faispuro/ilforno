import React, { useEffect, useRef } from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { MenuSection } from '../components/catalog/MenuSection';
import { PageTransition } from '../components/layout/PageTransition';
import { ScrollSection } from '../components/common/ScrollSection';
import { trackEvent } from '../services/analyticsService';
import { useLandingContent } from '../context/LandingContext';

export const HomePage = () => {
  const tracked = useRef(false);
  const { hero, steps, menu, isLoading } = useLandingContent();

  useEffect(() => {
    // Evita duplicar peticiones durante el desarrollo (React StrictMode)
    if (!tracked.current) {
      trackEvent('VISIT');
      tracked.current = true;
    }
  }, []);

  return (
    <PageTransition>
      <main className="overflow-hidden space-y-12">
        <ScrollSection direction="fade" duration={1100}>
          <HeroSection hero={hero} />
        </ScrollSection>

        <ScrollSection direction="up" delay={150} duration={1000}>
          <FeaturesSection steps={steps} />
        </ScrollSection>

        {!isLoading && (
          <ScrollSection direction="spin" delay={300} duration={1000}>
            <MenuSection products={menu} />
          </ScrollSection>
        )}
      </main>
    </PageTransition>
  );
};