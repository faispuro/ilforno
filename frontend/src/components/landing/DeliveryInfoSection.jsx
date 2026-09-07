import React from 'react';
import { ShoppingBag, Clock } from 'lucide-react';

export const DeliveryInfoSection = () => {
  return (
    <section className="relative bg-black text-white py-14 px-4 overflow-hidden border-t border-red-900/40">
      
      {/* Fondo sutil con imagen */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 grayscale mix-blend-luminosity"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1200&auto=format&fit=crop')`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-around gap-10 md:gap-6 text-center">
        
        <div className="flex flex-col sm:flex-row items-center gap-4 group">
          <div className="border-2 border-white/80 p-3.5 rounded-full group-hover:border-red-500 transition-colors">
            <ShoppingBag className="w-8 h-8 text-white group-hover:text-red-500 transition-colors" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-black text-2xl uppercase tracking-wider text-white leading-tight font-serif">
              PEDÍ ONLINE
            </h4>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block mt-0.5">
              O PASÁ POR NUESTRO LOCAL
            </span>
          </div>
        </div>

        <div className="hidden md:block w-px h-16 bg-linear-to-b from-transparent via-white/20 to-transparent" />

        <div className="flex flex-col sm:flex-row items-center gap-4 group">
          <div className="border-2 border-white/80 p-3.5 rounded-full group-hover:border-red-500 transition-colors">
            <Clock className="w-8 h-8 text-white group-hover:text-red-500 transition-colors" />
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-black text-2xl sm:text-3xl uppercase tracking-wider text-white font-serif leading-none">
              TU PEDIDO LISTO
            </h4>
            <span className="text-3xl sm:text-4xl font-black text-red-500 tracking-tighter uppercase font-serif block mt-1">
              EN 15'
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};