import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import API from '../services/api';

const defaultHero = {
  titleHighlight: 'La mejor pizza a la piedra',
  titleMain: 'que buscás está acá',
  badgeYears: 'MÁS DE 10 AÑOS',
  badgeText: 'compartiendo con vos',
  description:
    'Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.',
  bgImage:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
};

const defaultSteps = [
  { step: '01', title: '48 HORAS · MASA Y LEUDADO', desc: 'Fermentación lenta en frío para lograr una masa liviana.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
  { step: '02', title: '100% ARTESANAL · INGREDIENTES FRESCOS', desc: 'Muzzarella de primera marca y salsa casera.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002' },
  { step: '03', title: 'PRE-COCCIÓN · GOLPE DE HORNO', desc: 'Base cocida a alta temperatura.', image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212' },
  { step: '04', title: 'LISTAS PARA HOY · DIRECTO A TU HORNO', desc: 'Las guardás en el freezer y listas en minutos.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
];

const LandingContext = createContext(null);

export const LandingProvider = ({ children }) => {
  const [hero, setHero] = useState(defaultHero);
  const [steps, setSteps] = useState(defaultSteps);
  const [menu, setMenu] = useState([]);
  const [whatsapp, setWhatsapp] = useState('+54 9 341 555-0199');
  const [isLoading, setIsLoading] = useState(true);

  const normalizeHero = (payload) => ({
    ...defaultHero,
    ...(payload || {}),
  });

  const normalizeMenu = (items = []) =>
    items.map((pizza, index) => ({
      id: pizza.id ?? `${pizza.name || 'pizza'}-${index}`,
      name: pizza.name || 'Pizza',
      description: pizza.description || 'Pizza artesanal preparada a la piedra.',
      price: Number(pizza.price ?? 0),
      image: pizza.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
      tag: pizza.tagBadge || 'RECOMENDADA',
      available: pizza.available ?? true,
      orderNumber: pizza.orderNumber ?? index + 1,
    }));

  const hydrate = async () => {
    try {
      const [heroRes, pizzasRes, oficioRes, whatsappRes] = await Promise.all([
        API.get('/landing/hero').catch(() => ({ data: defaultHero })),
        API.get('/pizzas').catch(() => ({ data: [] })),
        API.get('/landing/oficio').catch(() => ({ data: { steps: defaultSteps } })),
        API.get('/landing/whatsapp').catch(() => ({ data: { phone: '+54 9 341 555-0199' } })),
      ]);

      setHero(normalizeHero(heroRes.data));
      setMenu(normalizeMenu(pizzasRes.data));
      setSteps(Array.isArray(oficioRes.data?.steps) ? oficioRes.data.steps : defaultSteps);
      setWhatsapp(whatsappRes.data?.phone || whatsappRes.data?.phoneNumber || '+54 9 341 555-0199');
    } catch (error) {
      console.error('Error cargando contenido del landing:', error);
      setHero(defaultHero);
      setMenu([]);
      setSteps(defaultSteps);
      setWhatsapp('+54 9 341 555-0199');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hydrate();
  }, []);

  const value = useMemo(
    () => ({ hero, steps, menu, whatsapp, isLoading, refresh: hydrate }),
    [hero, steps, menu, whatsapp, isLoading]
  );

  return <LandingContext.Provider value={value}>{children}</LandingContext.Provider>;
};

export const useLandingContent = () => {
  const context = useContext(LandingContext);
  if (!context) {
    throw new Error('useLandingContent debe usarse dentro de LandingProvider');
  }
  return context;
};
