import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Flame, Sparkles } from 'lucide-react';

export const PizzaCarousel = ({ pizzas = [], onCustomizePizza }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const extendedPizzas = [...pizzas, ...pizzas];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;

      scrollRef.current.scrollTo({
        left: direction === 'right' ? scrollLeft + scrollAmount : scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth ? container.scrollWidth / 2 : 0;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft -= maxScroll;
        } else {
          container.scrollLeft += 1.5;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, pizzas.length]);

  return (
    <div 
      className="relative max-w-7xl mx-auto py-6 px-4 sm:px-12 group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 sm:-left-2 top-1/2 -translate-y-1/2 z-30 bg-stone-950/60 hover:bg-stone-900 text-stone-300 hover:text-white p-3 rounded-full backdrop-blur-md border border-stone-800 hover:border-red-500/50 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 stroke-2" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 sm:-right-2 top-1/2 -translate-y-1/2 z-30 bg-stone-950/60 hover:bg-stone-900 text-stone-300 hover:text-white p-3 rounded-full backdrop-blur-md border border-stone-800 hover:border-red-500/50 shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 stroke-2" />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-6 sm:gap-10 overflow-x-auto scrollbar-none py-10 px-2"
      >
        {extendedPizzas.map((pizza, index) => (
          <div
            key={`${pizza.id}-${index}`}
            className="group relative shrink-0 w-72 sm:w-80 flex flex-col items-center select-none"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              <div className="absolute w-56 h-56 rounded-full bg-linear-to-r from-red-600/0 via-amber-500/0 to-red-600/0 group-hover:from-red-600/30 group-hover:via-amber-500/20 group-hover:to-red-600/30 blur-2xl transition-all duration-500 pointer-events-none" />

              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)] group-hover:drop-shadow-[0_20px_25px_rgba(220,38,38,0.35)] group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-out z-10"
              />

              {pizza.category && (
                <div className="absolute top-2 left-2 z-20 bg-stone-950/80 backdrop-blur-md border border-red-500/30 text-red-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-lg group-hover:opacity-0 transition-opacity duration-300">
                  <Flame className="w-3 h-3 text-red-500" />
                  {pizza.category}
                </div>
              )}

              <div className="absolute inset-0 z-20 bg-stone-950/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-between text-center p-6 border-2 border-red-600/40 shadow-[0_0_30px_rgba(220,38,38,0.25)] transform group-hover:scale-100 scale-90 pointer-events-none group-hover:pointer-events-auto">
                <div className="space-y-1 mt-1">
                  <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-800/40">
                    <Sparkles className="w-2.5 h-2.5" /> Especialidad
                  </div>
                  <h4 className="text-lg sm:text-xl font-black font-serif uppercase tracking-tight text-stone-100 leading-tight px-2">
                    {pizza.name}
                  </h4>
                </div>

                <p className="text-[11px] text-stone-300 font-medium leading-tight line-clamp-3 px-3">
                  {pizza.description}
                </p>

                <div className="w-full mb-1 flex flex-col items-center gap-1.5 pt-2 border-t border-stone-800/80">
                  <span className="text-base font-black font-serif text-red-500 tracking-tight">
                    ${pizza.price?.toLocaleString('es-AR')}
                  </span>

                  <button
                    onClick={() => onCustomizePizza?.(pizza)}
                    className="bg-red-600 hover:bg-red-500 text-white text-[11px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full flex items-center gap-1 shadow-md shadow-red-600/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-3" /> Pedir
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 text-center space-y-0.5 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-lg font-black font-serif uppercase tracking-wide text-stone-100">
                {pizza.name}
              </h3>
              <p className="text-sm font-bold text-red-500 tracking-tight font-serif">
                ${pizza.price?.toLocaleString('es-AR')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};