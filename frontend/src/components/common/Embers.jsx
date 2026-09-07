import React from 'react';

const DEFAULT_EMBERS = [
  { left: '6%', size: 5, delay: '0.2s', duration: '8s' },
  { left: '18%', size: 3, delay: '2.4s', duration: '10s' },
  { left: '84%', size: 6, delay: '1.1s', duration: '7.5s' },
  { left: '93%', size: 4, delay: '3.6s', duration: '9s' },
  { left: '50%', size: 3, delay: '4.4s', duration: '11s' },
];

// Brasas flotantes de fondo — mismo criterio visual en Hero y OrderProcessSection
export const Embers = ({ embers = DEFAULT_EMBERS, bottom = 'bottom-16' }) => {
  return (
    <>
      {embers.map((ember, i) => (
        <span
          key={i}
          className={`absolute ${bottom} rounded-full bg-amber-400 pointer-events-none`}
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            boxShadow: '0 0 6px 2px rgba(251,146,60,0.5)',
            animation: `ember-float ${ember.duration} ease-in infinite`,
            animationDelay: ember.delay,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};