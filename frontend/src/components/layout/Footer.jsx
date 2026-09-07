import React from 'react';
import { Flame, MessageCircle, Pizza } from 'lucide-react';

// Genera el recorte dentado tipo "masa mordida" para la transición superior
const zigzagClip = (() => {
  const teeth = 28;
  const points = ['0% 0%'];
  for (let i = 0; i <= teeth; i++) {
    const x = (i / teeth) * 100;
    const y = i % 2 === 0 ? 0 : 100;
    points.push(`${x}% ${y}%`);
  }
  points.push('100% 0%');
  return `polygon(${points.join(', ')})`;
})();

const WHATSAPP_NUMBER = '543410000000';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Tengo una duda 🍕')}`;

export const Footer = () => {
  return (
    <footer className="relative bg-stone-950 text-stone-100">

      {/* Transición dentada: como el borde de la masa o de la caja abierta */}
      <div
        className="relative h-6 sm:h-8 bg-red-700"
        style={{ clipPath: zigzagClip }}
        aria-hidden="true"
      />

      {/* Bloque rojo: marca + comanda de contacto + copyright, todo junto */}
      <div className="bg-red-700 pt-2 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center pb-10">

          {/* Marca */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8 text-center md:text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-red-200">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold tracking-wide">horno a leña, todos los días</span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black font-serif uppercase tracking-tight text-white leading-[0.9]">
                Il Fondo
              </h2>
              <p className="text-red-100 text-sm sm:text-base font-medium max-w-sm">
                Sin atajos. Solo fuego, masa madre y el tiempo que hace falta.
              </p>
            </div>

            {/* Sello circular, en línea con el badge "100% CASERA" del menú */}
            <div className="w-28 h-28 rounded-full border-2 border-red-300/40 flex flex-col items-center justify-center text-center rotate-6 hover:rotate-0 transition-transform duration-300 shrink-0">
              <Pizza className="w-7 h-7 text-white mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-100 leading-tight">
                Rosario<br />desde 2014
              </span>
            </div>
          </div>

          {/* Comanda: WhatsApp + Instagram integrados */}
          <div className="relative bg-stone-100 text-stone-900 px-6 pt-6 pb-5 w-full sm:w-72 shadow-2xl -rotate-2 mx-auto lg:mx-0 shrink-0">
            <div className="absolute -top-2 left-0 right-0 flex justify-between px-3" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-red-700" />
              ))}
            </div>

            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500 text-center">
              Comanda
            </p>
            <p className="font-mono text-xs text-center text-stone-800 font-bold mt-1">
              1x Pizza a la piedra
            </p>
            <div className="border-t border-dashed border-stone-400 my-3" />

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-2.5 rounded-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              ¿Tenés alguna duda?
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 text-stone-500 hover:text-red-700 text-[11px] font-mono mt-3 transition-colors"
            >
              <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @ilfondo.rosario
            </a>

            <div className="absolute -bottom-2 left-0 right-0 flex justify-between px-3" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-red-700" />
              ))}
            </div>
          </div>
        </div>

        {/* Copyright, dentro del bloque rojo */}
        <div className="max-w-6xl mx-auto border-t border-red-500/40 pt-5 text-center">
          <span className="text-[11px] text-red-100/80 font-medium">
            © {new Date().getFullYear()} Il Fondo Trattoria
          </span>
        </div>
      </div>

    </footer>
  );
};