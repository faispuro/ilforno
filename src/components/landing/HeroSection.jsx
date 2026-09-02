import React from 'react';
import { ArrowDown, ShoppingBag } from 'lucide-react';

export const HeroSection = ({ onNavigateToMenu }) => {
  const handleScroll = () => {
    if (onNavigateToMenu) {
      onNavigateToMenu();
    } else {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-stone-950 text-stone-100 overflow-hidden">
      
      {/* 1. Hero Principal */}
      <div className="relative min-h-screen flex items-center justify-center text-center px-4 pt-32 pb-20">
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-1000 hover:scale-100 pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop')`,
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/90 text-white font-black tracking-widest text-xs uppercase shadow-lg">
            IL FONDO • TRATTORIA
          </span>
          
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-stone-100 leading-tight font-serif drop-shadow-md">
            La mejor pizza a la piedra <br className="hidden sm:inline" />
            <span className="text-red-500">que buscás está acá</span>
          </h1>

          <div className="flex items-center justify-center gap-3 text-red-500 font-bold tracking-wider uppercase text-sm sm:text-base">
            <span>ROSARIO</span>
            <span>•</span>
            <span>MASA MADRE</span>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleScroll}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Menú y Encargar
            </button>
          </div>
        </div>

        <button 
          onClick={handleScroll}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-stone-400 hover:text-stone-100 transition-colors animate-bounce cursor-pointer z-10"
          aria-label="Ir al menú"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>

      {/* 2. Sección Roja de Historia */}
      <div className="bg-red-700 text-white py-16 px-4 sm:px-6 lg:px-8 relative shadow-2xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
              MÁS DE 10 AÑOS
            </h2>
            <p className="text-xl sm:text-2xl font-bold text-red-200 tracking-wider uppercase">
              compartiendo con vos
            </p>
          </div>

          <div className="text-sm sm:text-base leading-relaxed text-red-100 font-medium space-y-3 text-center md:text-left">
            <p>
              Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.
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