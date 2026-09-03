import React from 'react';
import { HeroSection } from '../landing/HeroSection';
import { FeaturesSection } from '../landing/FeaturesSection';
import { MenuSection } from '../catalog/MenuSection';
import { PageTransition } from '../layout/PageTransition';
import { ScrollSection } from '../common/ScrollSection';
import { PIZZAS } from '../../data/pizzas';

export const HomePage = () => {
  return (
    <PageTransition>
      <main className="overflow-hidden space-y-12">
        {/* Hero: fade lento con blur, más ceremonioso */}
        <ScrollSection direction="fade" duration={1100}>
          <HeroSection />
        </ScrollSection>

        {/* Features: entra desde abajo, más lento y con más delay */}
        <ScrollSection direction="up" delay={150} duration={1000}>
          <FeaturesSection />
        </ScrollSection>

        {/* Menú: entra girando levemente, con delay grande para que se note */}
        <ScrollSection direction="spin" delay={300} duration={1000}>
          <MenuSection products={PIZZAS} />
        </ScrollSection>
      </main>
    </PageTransition>
  );
};