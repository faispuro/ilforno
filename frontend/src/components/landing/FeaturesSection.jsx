import React, { useState, useEffect } from 'react';
import { Flame, Clock, UtensilsCrossed, PackageCheck } from 'lucide-react';
import { ScrollSection } from '../common/ScrollSection';
import { StaggerGroup } from '../common/StaggerGroup';

const STYLE = `
  @keyframes kenBurns {
    0% { transform: scale(1.06); }
    100% { transform: scale(1); }
  }
  .ken-burns {
    animation: kenBurns 6s ease-out forwards;
  }
`;

export const FeaturesSection = ({ steps = [] }) => {
  const [activeStep, setActiveStep] = useState(0);

  const formattedSteps = (steps.length ? steps : [
    {
      step: '01',
      title: '48 HORAS · MASA Y LEUDADO',
      desc: 'Fermentación lenta en frío para lograr una masa liviana.',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1200&auto=format&fit=crop'
    },
    {
      step: '02',
      title: '100% ARTESANAL · INGREDIENTES FRESCOS',
      desc: 'Muzzarella de primera marca y salsa casera.',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1200&auto=format&fit=crop'
    },
    {
      step: '03',
      title: 'PRE-COCCIÓN · GOLPE DE HORNO',
      desc: 'Base cocida a alta temperatura.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop'
    },
    {
      step: '04',
      title: 'LISTAS PARA HOY · DIRECTO A TU HORNO',
      desc: 'Las guardás en el freezer y listas en minutos.',
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=1200&auto=format&fit=crop'
    }
  ]).map((item, index) => ({
    ...item,
    icon: [Clock, UtensilsCrossed, Flame, PackageCheck][index % 4],
    tag: item.title?.split('·')[0]?.trim() || ['48 HORAS', '100% ARTESANAL', 'PRE-COCCIÓN', 'LISTAS PARA HOY'][index],
    description: item.desc || item.description || 'Paso artesanal de la cocina.',
    image: item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop'
  }));

  // Rotación automática
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % formattedSteps.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [formattedSteps.length]);

  return (
    <section className="relative bg-stone-950 text-stone-100 py-20 px-4 sm:px-6 lg:px-8 border-t border-stone-800/80 overflow-hidden">
      <style>{STYLE}</style>

      {/* Fondo de pizarrón sutil unificado */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">

        {/* Encabezado Principal */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-red-500 block">
            NUESTRO OFICIO
          </span>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-wider text-stone-100 font-serif leading-tight">
            ¿POR QUÉ LA PIZZA <br className="hidden sm:block" />
            <span className="text-red-500">SALE DISTINTA?</span>
          </h2>

          <p className="text-stone-400 text-sm sm:text-base font-medium max-w-xl mx-auto pt-1">
            Sin secretos guardados: masa con descanso, pre-cocción justa y materia prima de calidad para hacer en casa.
          </p>
        </div>

        {/* Layout de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Lista de pasos: entra en cascada al hacer scroll, una sola vez */}
          <StaggerGroup
            className="lg:col-span-6 space-y-8 divide-y divide-stone-800/80"
            direction="up"
            baseDelay={0}
            step={120}
          >
            {formattedSteps.map((item, index) => {
              const isActive = activeStep === index;
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  onClick={() => setActiveStep(index)}
                  className={`group cursor-pointer transition-all duration-300 ${
                    index !== 0 ? 'pt-8' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full border transition-colors ${
                          isActive
                            ? 'border-red-500 bg-red-950/30'
                            : 'border-stone-700/80 bg-stone-900 group-hover:border-red-500'
                        }`}>
                          <Icon className="w-6 h-6 text-stone-100 group-hover:text-red-500 transition-colors" />
                        </div>

                        <div>
                          <span className="text-[10px] font-black tracking-widest text-stone-500 uppercase block">
                            {item.tag}
                          </span>
                          <h3 className={`text-lg font-black font-serif uppercase tracking-wider transition-colors ${
                            isActive ? 'text-red-500' : 'text-stone-100 group-hover:text-red-500'
                          }`}>
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-stone-400 text-xs sm:text-sm leading-relaxed pl-1">
                        {item.description}
                      </p>
                    </div>

                    <span className={`text-xs font-black tracking-widest font-serif transition-colors ${
                      isActive ? 'text-red-500 scale-110' : 'text-stone-600'
                    }`}>
                      {item.step}
                    </span>

                  </div>
                </div>
              );
            })}
          </StaggerGroup>

          <div className="lg:col-span-6 h-100 sm:h-125 relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-950">
            {formattedSteps.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeStep === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover ${activeStep === index ? 'ken-burns' : ''}`}
                />

                <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black tracking-widest text-red-500 uppercase block">
                      PASO {item.step} • {item.tag}
                    </span>
                    <h4 className="text-xl font-black font-serif uppercase tracking-wider text-stone-100 drop-shadow-md">
                      {item.title}
                    </h4>
                  </div>
                  <span className="hidden sm:block text-[10px] font-black text-stone-400 tracking-widest uppercase font-serif drop-shadow">
                    TRATTORIA • ROSARIO
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};