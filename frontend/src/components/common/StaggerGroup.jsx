import React, { Children, cloneElement } from 'react';
import { ScrollSection } from './ScrollSection';

export const StaggerGroup = ({
  children,
  baseDelay = 0,
  step = 120, 
  direction = 'spin',
  className = '',
}) => {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <ScrollSection direction={direction} delay={baseDelay + i * step}>
          {child}
        </ScrollSection>
      ))}
    </div>
  );
};