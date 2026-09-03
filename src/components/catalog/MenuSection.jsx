import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

export const MenuSection = ({ products = [], onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0); // fuerza replay de animaciones en cada cambio de pizza

  const goTo = (updater) => {
    setCurrentIndex(updater);
    setAnimKey((k) => k + 1);
  };

  const handlePrev = () => {
    goTo((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    goTo((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Rotación automática cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [products.length]);

  if (!products.length) return null;

  const currentPizza = products[currentIndex];

  return (
    <section id="menu" className="relative bg-stone-950 text-stone-100 py-16 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 overflow-hidden">

      {/* Keyframes locales para la entrada estilo "masa cayendo" */}
      <style>{`
        @keyframes doughDropIn {
          0% { opacity: 0; transform: translateY(28px) scale(0.9) rotate(-6deg); filter: blur(4px); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); filter: blur(0); }
        }
        @keyframes tagSwing {
          0% { opacity: 0; transform: translateY(-16px) rotate(14deg) scale(0.85); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) rotate(6deg) scale(1); }
        }
        @keyframes badgeDrop {
          0% { opacity: 0; transform: translateY(-20px) rotate(-24deg) scale(0.7); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) rotate(-12deg) scale(1); }
        }
        .anim-dough { animation: doughDropIn 900ms ${DOUGH_EASE} both; }
        .anim-tag { animation: tagSwing 950ms ${DOUGH_EASE} both; }
        .anim-badge { animation: badgeDrop 900ms ${DOUGH_EASE} both; }
      `}</style>

      {/* Fondo limpio con degradado radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-stone-900/60 via-stone-950 to-stone-950 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Encabezado con controles modernos */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-red-500 block">
              NUESTRA CARTA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-stone-100 font-serif">
              ESPECIALES <span className="text-red-500">A LA PIEDRA</span>
            </h2>
          </div>

          {/* Controles del Carrusel + ficha de madera numerada */}
          <div className="flex items-center gap-3 bg-stone-900/80 pl-1.5 pr-3 py-1.5 rounded-full border border-stone-800 backdrop-blur-sm">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-stone-800/80 hover:bg-red-600 hover:text-white transition-all text-stone-300 cursor-pointer shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="w-9 h-9 rounded-full bg-linear-to-br from-amber-800 to-amber-950 border-2 border-amber-700/60 flex items-center justify-center shadow-inner shrink-0">
              <span className="font-serif font-black text-xs text-amber-100 leading-none">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[11px] font-bold tracking-widest text-stone-500 uppercase">
              de {String(products.length).padStart(2, '0')}
            </span>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-stone-800/80 hover:bg-red-600 hover:text-white transition-all text-stone-300 cursor-pointer shadow-sm"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Layout Estático con Alturas Fijas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 min-h-115">

          {/* Columna Izquierda: Pizza sobre bandeja de madera */}
          <div key={`img-col-${animKey}`} className="lg:col-span-6 relative flex items-center justify-center order-2 lg:order-1">

            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-red-600/25 blur-3xl pointer-events-none" aria-hidden="true" />

            {/* Sello / Badge 100% Casera — cae primero, con leve delay */}
            <div
              className="anim-badge absolute top-0 left-2 sm:left-8 z-30 bg-red-600 text-white font-black p-3.5 rounded-full shadow-2xl border-2 border-stone-900 flex flex-col items-center justify-center w-18 h-18 text-center leading-none"
              style={{ animationDelay: '150ms' }}
            >
              <span className="text-[9px] tracking-widest text-red-200 uppercase font-sans">100%</span>
              <span className="text-xs font-serif uppercase tracking-wider text-white mt-0.5">CASERA</span>
            </div>

            {/* Bandeja de madera — entra primero, sin delay */}
            <div
              className="anim-dough relative z-10 w-68 h-68 sm:w-84 sm:h-84 lg:w-100 lg:h-100 rounded-full p-3 sm:p-4 shadow-2xl shrink-0"
              style={{
                background:
                  'repeating-radial-gradient(circle at 50% 50%, #78350f 0px, #78350f 3px, #92400e 3px, #92400e 6px), linear-gradient(135deg, #a16207, #451a03)',
                backgroundBlendMode: 'overlay',
              }}
            >
              <div className="w-full h-full rounded-full border-4 border-stone-950/40 shadow-inner overflow-hidden bg-stone-900">
                <img
                  src={currentPizza.image}
                  alt={currentPizza.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/10 pointer-events-none" />
              </div>
            </div>

            {/* Cartelito de precio — cae al final, como colgando */}
            <div
              className="anim-tag absolute z-30 top-4 sm:top-6 right-0 sm:right-0"
              style={{ animationDelay: '300ms' }}
            >
              <div className="relative bg-amber-50 text-stone-900 px-4 py-2 rounded-sm shadow-xl border border-amber-900/10">
                <div className="absolute -top-1.5 left-4 w-3 h-3 rounded-full bg-stone-950 border-2 border-amber-100" aria-hidden="true" />
                <span className="block text-[9px] font-bold uppercase tracking-widest text-stone-500 leading-none mb-0.5">
                  precio
                </span>
                <span className="block font-serif italic font-black text-xl sm:text-2xl leading-none text-red-700">
                  ${currentPizza.price?.toLocaleString() || currentPizza.price}
                </span>
              </div>
            </div>

          </div>

          {/* Columna Derecha: Información Centrada */}
          <div key={`info-col-${animKey}`} className="lg:col-span-6 space-y-6 text-center flex flex-col items-center justify-center order-1 lg:order-2">

            <div
              className="anim-dough flex items-center justify-center gap-3 h-7"
              style={{ animationDelay: '80ms' }}
            >
              <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-[10px] uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-current" />
                RECOMENDADA
              </span>

              {currentPizza.tag && (
                <span className="text-xs font-black tracking-widest text-stone-500 uppercase">
                  • {currentPizza.tag}
                </span>
              )}
            </div>

            <div className="space-y-3 max-w-lg w-full">
              <div className="min-h-18 sm:min-h-30 flex items-center justify-center">
                <h3
                  className="anim-dough text-4xl sm:text-6xl font-black uppercase tracking-tight text-stone-100 font-serif leading-none"
                  style={{ animationDelay: '200ms' }}
                >
                  {currentPizza.name}
                </h3>
              </div>

              <div className="min-h-15 flex items-center justify-center">
                <p
                  className="anim-dough text-stone-400 text-sm sm:text-base leading-relaxed font-medium italic line-clamp-3 border-l-2 border-red-700/50 pl-4 text-left max-w-md"
                  style={{ animationDelay: '350ms' }}
                >
                  {currentPizza.description || "Elaborada con fermentación lenta de 48 hs, salsa casera de tomate perita y muzzarella fundida."}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Dots de Navegación */}
        <div className="flex items-center justify-center gap-2 pt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(() => index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? 'w-8 bg-red-500'
                  : 'w-2 bg-stone-800 hover:bg-stone-700'
              }`}
              aria-label={`Ir a pizza ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};