import React from 'react';
import { Eye, MousePointerClick, TrendingUp, Pizza, Sparkles, Flame, Activity } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes metricCardIn {
    0% { opacity: 0; transform: translateY(24px) scale(0.94); filter: blur(3px); }
    60% { opacity: 1; }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes flameFlicker {
    0%, 100% { transform: scale(1) rotate(-3deg); }
    50% { transform: scale(1.1) rotate(3deg); }
  }
  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
  }
  .metric-card-in { animation: metricCardIn 750ms ${DOUGH_EASE} both; }
  .glow-bg { animation: pulseGlow 6s ease-in-out infinite; }
`;

export const MetricsTab = ({ stats = {}, activePizzasCount = 0 }) => {
  // Parsing seguro del porcentaje de conversión
  const rawRate = String(stats.conversionRate ?? '0').replace('%', '').replace(',', '.');
  const conversionNum = Math.min(Math.max(parseFloat(rawRate) || 0, 0), 100);
  const ringDeg = conversionNum * 3.6;

  const cards = [
    {
      label: 'Visitas Totales',
      value: stats.views ?? 0,
      icon: Eye,
      accent: 'amber',
      glowColor: 'from-amber-600/10 to-transparent',
      footer: (
        <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-bold bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-md w-fit">
          <TrendingUp className="w-3.5 h-3.5" /> +12% este mes
        </span>
      ),
    },
    {
      label: 'Pedir por WhatsApp',
      value: stats.clicks ?? 0,
      icon: MousePointerClick,
      accent: 'amber',
      glowColor: 'from-amber-500/15 to-transparent',
      footer: <p className="text-[11px] font-mono text-stone-400">Intenciones de compra directas</p>,
    },
    {
      label: 'Menú Activo',
      value: activePizzasCount,
      icon: Pizza,
      accent: 'stone',
      glowColor: 'from-stone-500/10 to-transparent',
      footer: <p className="text-[11px] font-mono text-stone-400">Variedades disponibles en carta</p>,
    },
  ];

  return (
    <div className="space-y-8">
      <style>{STYLE}</style>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1 bg-amber-950/50 border border-amber-900/50 px-2.5 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 text-amber-500 animate-[flameFlicker_1.8s_ease-in-out_infinite]" />
              Panel de Rendimiento
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black tracking-tight text-stone-100">
            Métricas del Negocio
          </h2>
          <p className="text-xs font-mono text-stone-400">
            Monitoreo en tiempo real del tráfico y conversión directa hacia tu WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-stone-900/90 border border-stone-800 px-3.5 py-2 rounded-xl text-xs font-mono text-emerald-400 shadow-inner w-fit">
          <span className="relative flex w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-stone-200">En vivo</span>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          const isAmber = card.accent === 'amber';
          return (
            <div
              key={card.label}
              className={`metric-card-in relative bg-stone-900/40 border ${
                isAmber ? 'border-amber-900/40 hover:border-amber-600/60' : 'border-stone-800/80 hover:border-stone-700'
              } p-6 rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              {/* Ajustado bg-gradient-to-br para compatibilidad Tailwind v3 */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${card.glowColor} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`}
              />

              <div
                className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-[0.05] pointer-events-none"
                style={{
                  background: 'repeating-radial-gradient(circle at 50% 50%, #78350f 0px, #78350f 3px, #92400e 3px, #92400e 6px)',
                }}
              />

              <div className="flex items-center justify-between relative z-10 mb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
                  {card.label}
                </span>
                <div className={`p-2 rounded-xl bg-stone-950/60 border ${isAmber ? 'border-amber-900/50 text-amber-500' : 'border-stone-800 text-stone-400 group-hover:text-stone-200'} transition-colors`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 mb-3">
                <p className="text-4xl font-serif font-black tracking-tight text-stone-100">
                  {card.value}
                </p>
              </div>

              <div className="relative z-10 pt-2 border-t border-stone-800/50">
                {card.footer}
              </div>
            </div>
          );
        })}

        {/* Tarjeta de Tasa de Conversión */}
        <div
          className="metric-card-in relative bg-stone-900/40 border border-amber-900/40 hover:border-amber-600/60 p-6 rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between"
          style={{ animationDelay: `${cards.length * 90}ms` }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-amber-600/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none" />

          <div className="flex items-center justify-between relative z-10 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
              Efectividad
            </span>
            <div className="p-2 rounded-xl bg-stone-950/60 border border-amber-900/50 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10 my-2">
            <div
              className="relative w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-inner"
              style={{
                background: `conic-gradient(#f59e0b ${ringDeg}deg, #1c1917 0deg)`,
              }}
            >
              <div className="absolute inset-1.5 rounded-full bg-stone-950 flex items-center justify-center border border-stone-800/80">
                <span className="text-xs font-serif font-black text-amber-400">
                  {stats.conversionRate ?? '0%'}
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-stone-200">Tasa de conversión</p>
              <p className="text-[10px] font-mono text-stone-400 leading-tight mt-0.5">
                Clics sobre visitas totales
              </p>
            </div>
          </div>

          <div className="relative z-10 pt-2 border-t border-stone-800/50">
            <span className="text-[10px] font-mono text-amber-400/90 font-medium flex items-center gap-1">
              <Activity className="w-3 h-3" /> Optimizado para WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};