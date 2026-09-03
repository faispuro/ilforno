import React from 'react';
import { OrderProcessSection } from '../components/landing/OrderProcessSection';
import { PageTransition } from '../components/layout/PageTransition';

export const HowItWorksPage = () => {
  return (
    <PageTransition>
      <main className="pt-20">
        <OrderProcessSection />
      </main>
    </PageTransition>
  );
};