import React from 'react';
import { OrderProcessSection } from '../landing/OrderProcessSection';
import { PageTransition } from '../layout/PageTransition';

export const HowItWorksPage = () => {
  return (
    <PageTransition>
      <main className="pt-20">
        <OrderProcessSection />
      </main>
    </PageTransition>
  );
};