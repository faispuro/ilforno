import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { MenuSection } from '../components/catalog/MenuSection';
import { PageTransition } from '../components/layout/PageTransition';
import { ScrollSection } from '../components/common/ScrollSection';
import { PIZZAS } from '../data/pizzas';

export const HomePage = () => {
  return (
    <PageTransition>
      <main className="overflow-hidden space-y-12">
        <ScrollSection direction="fade" duration={1100}>
          <HeroSection />
        </ScrollSection>

        <ScrollSection direction="up" delay={150} duration={1000}>
          <FeaturesSection />
        </ScrollSection>

        <ScrollSection direction="spin" delay={300} duration={1000}>
          <MenuSection products={PIZZAS} />
        </ScrollSection>
      </main>
    </PageTransition>
  );
};