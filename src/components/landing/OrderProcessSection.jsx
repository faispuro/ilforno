import React from 'react';
import { MessageCircle, ClipboardList, CalendarCheck, Flame } from 'lucide-react';
import { Embers } from '../common/Embers';
import { ScrollSection } from '../common/ScrollSection';

const WHATSAPP_NUMBER = '543410000000';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quería consultar por un pedido 🍕')}`;

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    tag: 'SIN APURO',
    title: 'ELEGÍS TU PIZZA',
    text: 'Mirás la carta y ves cuál te cierra. No hace falta decidir todo de una: con una idea alcanza para arrancar.',
    rotate: '-2deg',
  },
  {
    step: '02',
    icon: MessageCircle,
    tag: 'DIRECTO POR WHATSAPP',
    title: 'NOS ESCRIBÍS',
    text: 'Contanos qué pizza, cuántas y para cuándo la querés. Te decimos si llegamos con esa fecha.',
    rotate: '1.5deg',
  },
  {
    step: '03',
    icon: CalendarCheck,
    tag: 'RECIÉN AHÍ PRENDEMOS EL HORNO',
    title: 'COORDINAMOS Y LA HACEMOS',
    text: 'Confirmamos día y horario juntos. Nada de pizza esperando de antes: se cocina para vos, cuando la buscás.',
    rotate: '-1deg',
  },
];

// Único keyframe realmente específico de esta sección: el vapor del celular
const STEAM_STYLE = `
  @keyframes steam-rise {
    0% { transform: translateY(0) scaleX(1); opacity: 0; }
    25% { opacity: 0.35; }
    100% { transform: translateY(-50px) scaleX(1.6); opacity: 0; }
  }
`;

export const OrderProcessSection = () => {
  return (
    <section className="relative bg-stone-950 text-stone-100 py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 overflow-hidden">
      <style>{STEAM_STYLE}</style>

      {/* Fondo de pizarrón sutil */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />

      <Embers
        bottom="bottom-10"
        embers={[
          { left: '8%', size: 6, delay: '0s', duration: '7s' },
          { left: '22%', size: 4, delay: '1.8s', duration: '9s' },
          { left: '78%', size: 5, delay: '3.2s', duration: '8s' },
          { left: '90%', size: 3, delay: '0.6s', duration: '6.5s' },
        ]}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Header con animación fade-up */}
        <ScrollSection direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-500">
              <Flame className="w-3.5 h-3.5" style={{ animation: 'flame-flicker 1.6s ease-in-out infinite' }} />
              CÓMO PEDÍS
            </span>

            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-stone-100 font-serif leading-tight">
              ASÍ ARMAMOS <br className="hidden sm:block" />
              <span className="text-red-500">TU PEDIDO</span>
            </h2>

            <p className="text-stone-400 text-sm sm:text-base font-medium max-w-xl mx-auto pt-1">
              No tenemos pizzas esperando bajo lámpara. Cada una se cocina para alguien, en el momento que coordinamos con vos.
            </p>
          </div>
        </ScrollSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Columna Izquierda: Pasos (Entrada desde la izquierda) */}
          <div className="lg:col-span-6 relative">
            <ScrollSection direction="left" delay={200}>
              <div className="hidden sm:block absolute left-4 top-2 bottom-2 w-px bg-stone-700" aria-hidden="true" />

              <div className="space-y-6">
                {steps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="relative sm:pl-12">
                      <div
                        className="hidden sm:flex absolute left-0 top-6 w-8 h-8 rounded-full bg-stone-900 border border-stone-700 items-center justify-center z-10"
                        aria-hidden="true"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      </div>

                      <div
                        className="relative bg-stone-100 text-stone-900 px-5 pt-5 pb-4 shadow-2xl rounded-sm"
                        style={{ transform: `rotate(${item.rotate})` }}
                      >
                        <div className="absolute -top-2.5 left-6 w-3 h-3 rounded-full bg-stone-950 border-2 border-stone-100" aria-hidden="true" />

                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-white" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                                paso {item.step} · {item.tag}
                              </span>
                            </div>
                            <h3 className="font-serif font-black uppercase text-base leading-tight mt-0.5">
                              {item.title}
                            </h3>
                            <div className="border-t border-dashed border-stone-300 my-2" />
                            <p className="font-mono text-[11px] text-stone-600 leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollSection>
          </div>

          {/* Columna Derecha: Mockup del celular (Entrada desde la derecha) */}
          <div className="lg:col-span-6 relative">
            <ScrollSection direction="right" delay={400}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-16 pointer-events-none z-0" aria-hidden="true">
                <span className="absolute left-4 bottom-0 w-3 h-10 rounded-full bg-white/10 blur-[6px]" style={{ animation: 'steam-rise 3.6s ease-out infinite' }} />
                <span className="absolute left-12 bottom-0 w-3 h-10 rounded-full bg-white/10 blur-[6px]" style={{ animation: 'steam-rise 3.6s ease-out infinite', animationDelay: '1.3s' }} />
              </div>

              <div className="relative max-w-80 mx-auto">
                <div className="relative bg-stone-900 rounded-[2.5rem] border-4 border-stone-800 shadow-2xl p-2 rotate-1">
                  <div className="flex justify-center py-2">
                    <div className="w-14 h-1.5 rounded-full bg-stone-800" />
                  </div>

                  <div className="rounded-[1.75rem] overflow-hidden border border-stone-800">
                    <div className="flex items-center justify-between px-4 py-1.5 bg-stone-900 text-[10px] font-bold text-stone-500">
                      <span>21:14</span>
                      <Flame className="w-3 h-3 text-red-500" />
                    </div>

                    <div className="flex items-center gap-3 px-4 py-3 bg-stone-900 border-b border-stone-800">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center shrink-0">
                        <Flame className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-100 leading-none">Il Fondo</p>
                        <p className="text-[11px] text-emerald-500 font-medium mt-0.5">en línea</p>
                      </div>
                    </div>

                    <div className="px-4 py-5 space-y-3 bg-[#0b141a]">
                      <div className="flex justify-end">
                        <div className="bg-emerald-800 text-stone-100 text-[13px] leading-relaxed rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%] shadow-md">
                          Hola! Vi la Napolitana en la carta, ¿puede ser para el sábado a la noche? Somos 4 🍕
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-stone-700 text-stone-100 text-[13px] leading-relaxed rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%] shadow-md">
                          Hola! Sí, tenemos lugar para el sábado. ¿Para qué hora la querés?
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="bg-emerald-800 text-stone-100 text-[13px] leading-relaxed rounded-2xl rounded-tr-sm px-3.5 py-2.5 max-w-[85%] shadow-md">
                          21:30 estaría perfecto
                        </div>
                      </div>

                      <div className="flex justify-start">
                        <div className="bg-stone-700 text-stone-100 text-[13px] leading-relaxed rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[85%] shadow-md">
                          Dale, quedás confirmada. Nos vemos el sábado 🔥
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-900 border-t border-stone-800">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-black text-xs py-3 rounded-xl shadow-lg shadow-red-950/40 transition-all hover:scale-[1.02] cursor-pointer uppercase tracking-wider"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Empezar a coordinar
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-center pt-2 pb-1">
                    <div className="w-24 h-1 rounded-full bg-stone-700" />
                  </div>
                </div>
              </div>
            </ScrollSection>
          </div>

        </div>
      </div>
    </section>
  );
};