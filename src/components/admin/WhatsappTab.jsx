import React, { useState } from 'react';
import { Save, MessageSquare, Flame, ExternalLink } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes ticketIn {
    0% { opacity: 0; transform: translateY(28px) rotate(0deg) scale(0.92); filter: blur(4px); }
    60% { opacity: 1; }
    100% { opacity: 1; transform: translateY(0) rotate(-1deg) scale(1); filter: blur(0); }
  }
  @keyframes flameFlicker {
    0%, 100% { transform: scale(1) rotate(-3deg); }
    50% { transform: scale(1.1) rotate(3deg); }
  }
  .ticket-in { animation: ticketIn 800ms ${DOUGH_EASE} both; }
`;

export const WhatsappTab = ({ phone, setPhone, onSave }) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const testHref = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent('Hola! Esto es una prueba de tu comanda 🍕')}`;

  return (
    <div className="max-w-xl mx-auto">
      <style>{STYLE}</style>

      {/* Encabezado */}
      <div className="text-center mb-6 space-y-1">
        <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-500">
          <Flame className="w-3.5 h-3.5" style={{ animation: 'flameFlicker 1.8s ease-in-out infinite' }} />
          Línea Directa
        </span>
        <h2 className="text-lg font-serif font-black text-stone-100">Enlace de Encargo</h2>
      </div>

      <div className="ticket-in relative bg-stone-100 text-stone-900 px-7 pt-7 pb-6 shadow-2xl mx-auto">
        <div className="absolute -top-2.5 left-0 right-0 flex justify-between px-4" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-stone-950" />
          ))}
        </div>

        <div className="flex items-center gap-3 border-b border-dashed border-stone-400 pb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">Comanda · Configuración</p>
            <h3 className="font-serif font-black text-base leading-tight">Número de WhatsApp</h3>
          </div>
        </div>

        <div className="space-y-4 pt-5">
          <div className="space-y-2">
            <label className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
              Formato internacional
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 9 341 555-0199"
              className="w-full bg-white border border-stone-300 focus:border-red-600 rounded-lg px-3.5 py-2.5 text-xs text-stone-900 font-mono focus:outline-none transition-colors"
            />
          </div>

          <div className="border-t border-dashed border-stone-400 pt-4 flex items-center justify-between gap-3">
            <a
              href={testHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-[11px] font-mono text-stone-500 hover:text-red-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Probar enlace
            </a>

            <button
              onClick={handleSave}
              className={`flex-1 font-mono font-black text-xs uppercase tracking-wider py-3 rounded-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all ${
                saved
                  ? 'bg-emerald-700 text-white shadow-emerald-950/50'
                  : 'bg-red-700 hover:bg-red-600 text-white shadow-red-950/50'
              }`}
            >
              <Save className="w-4 h-4" /> {saved ? 'Guardado ✓' : 'Guardar'}
            </button>
          </div>
        </div>

        <div className="absolute -bottom-2.5 left-0 right-0 flex justify-between px-4" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-stone-950" />
          ))}
        </div>
      </div>

      <p className="text-center text-[10px] font-mono text-stone-500 mt-6">
        Este número recibe todos los pedidos generados desde el botón "Ver Menú y Encargar".
      </p>
    </div>
  );
};