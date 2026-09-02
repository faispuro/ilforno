import React from 'react';
import { HeroSection } from '../landing/HeroSection';
import { FeaturesSection } from '../landing/FeaturesSection';
import { MenuSection } from '../catalog/MenuSection';
import { PageTransition } from '../layout/PageTransition';
import { PIZZAS } from '../../data/pizzas';

export const HomePage = () => {
  return (
    <PageTransition>
      <main>
        <HeroSection />
        <FeaturesSection />
        <MenuSection products={PIZZAS} />
      </main>
    </PageTransition>
  );
};