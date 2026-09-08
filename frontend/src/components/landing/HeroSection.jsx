import React from 'react';
import { ArrowDown, ShoppingBag, Flame } from 'lucide-react';
import { Embers } from '../common/Embers';
import { useMountReveal } from '../../hooks/useMountReveal';

// Solo lo específico de este Hero: cascada de textos y zoom de fondo
const HERO_STYLE = `
  @keyframes heroDoughIn {
    0% { opacity: 0; transform: translateY(32px) scale(0.94); filter: blur(4px); }
    60% { opacity: 1; }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes heroBadgeIn {
    0% { opacity: 0; transform: translateY(-18px) rotate(-8deg) scale(0.8); }
    60% { opacity: 1; }
    100% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }
  }
  @keyframes bgSlowZoom {
    0% { transform: scale(1.12); }
    100% { transform: scale(1.02); }
  }
  .hero-in { animation: heroDoughIn 950ms var(--dough-ease, cubic-bezier(0.34, 1.56, 0.64, 1)) both; }
  .hero-badge-in { animation: heroBadgeIn 900ms var(--dough-ease, cubic-bezier(0.34, 1.56, 0.64, 1)) both; }
`;

export const HeroSection = ({ onNavigateToMenu, hero = {} }) => {
  const mounted = useMountReveal(50);
  const heroData = {
    titleHighlight: 'La mejor pizza a la piedra',
    titleMain: 'que buscás está acá',
    badgeYears: 'MÁS DE 10 AÑOS',
    badgeText: 'compartiendo con vos',
    description: 'Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.',
    bgImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
    ...hero,
  };

  const handleScroll = () => {
    if (onNavigateToMenu) {
      onNavigateToMenu();
    } else {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-stone-950 text-stone-100 overflow-hidden">
      <style>{HERO_STYLE}</style>

      {/* 1. Hero Principal */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4 pt-32 pb-20">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url('${heroData.bgImage}')`,
            animation: 'bgSlowZoom 12s ease-out forwards',
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

        <Embers />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {mounted && (
            <>
              <span
                className="hero-badge-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 text-white font-black tracking-widest text-xs uppercase shadow-lg"
                style={{ animationDelay: '0ms' }}
              >
                <Flame className="w-3.5 h-3.5" style={{ animation: 'flame-flicker 1.6s ease-in-out infinite' }} />
                {heroData.badgeYears || 'IL FONDO • TRATTORIA'}
              </span>

              <h1
                className="hero-in text-5xl sm:text-7xl font-black uppercase tracking-tight text-stone-100 leading-tight font-serif drop-shadow-md"
                style={{ animationDelay: '150ms' }}
              >
                {heroData.titleHighlight} <br className="hidden sm:inline" />
                <span className="text-red-500">{heroData.titleMain}</span>
              </h1>

              <div
                className="hero-in flex items-center justify-center gap-3 text-red-500 font-bold tracking-wider uppercase text-sm sm:text-base"
                style={{ animationDelay: '320ms' }}
              >
                <span>{heroData.badgeText || 'ROSARIO'}</span>
              </div>

              <div
                className="hero-in pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
                style={{ animationDelay: '480ms' }}
              >
                <button
                  onClick={handleScroll}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ver Menú y Encargar
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 hover:text-stone-100 transition-colors animate-bounce cursor-pointer z-10"
          aria-label="Ir al menú"
          style={mounted ? { animationDelay: '650ms' } : { opacity: 0 }}
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>

      {/* 2. Sección Roja de Historia — ya NO va envuelta en ScrollSection acá */}
      <div className="bg-red-700 text-white py-16 px-4 sm:px-6 lg:px-8 relative shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
              {heroData.badgeYears}
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-red-200 tracking-wider uppercase">
              {heroData.badgeText}
            </p>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-red-100 font-medium space-y-3 text-center md:text-left">
            <p>
              {heroData.description}
            </p>
            <p className="font-semibold text-white">
              Trabajamos a pedido para garantizar que cada pizza salga crocante, fresca y al instante.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};