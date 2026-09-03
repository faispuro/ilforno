import { useEffect, useState } from 'react';

export const useMountReveal = (delay = 50) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return isVisible;
};
