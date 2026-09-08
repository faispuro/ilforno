import React from 'react';
import { OrderProcessSection } from '../components/landing/OrderProcessSection';
import { PageTransition } from '../components/layout/PageTransition';
import { useLandingContent } from '../context/LandingContext';

export const HowItWorksPage = () => {
  const { whatsapp } = useLandingContent();

  return (
    <PageTransition>
      <main className="pt-20">
        <OrderProcessSection whatsapp={whatsapp} />
      </main>
    </PageTransition>
  );
};