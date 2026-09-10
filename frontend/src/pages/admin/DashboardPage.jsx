import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Flame, BarChart3, Image as ImageIcon, BookOpen, Pizza, MessageSquare, ShieldCheck } from 'lucide-react';
import API from '../../services/api';
import { uploadImage } from '../../services/uploadService';
import { pizzaService } from '../../services/pizzasService';

import { MetricsTab } from '../../components/admin/MetricsTab';
import { HeroEditorTab } from '../../components/admin/HeroEditorTab';
import { StepsEditorTab } from '../../components/admin/StepsEditorTab';
import { MenuEditorTab } from '../../components/admin/MenuEditorTab';
import { WhatsappTab } from '../../components/admin/WhatsappTab';
import { getAnalyticsStats } from '../../services/analyticsService';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes tabBtnIn {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes panelIn {
    0% { opacity: 0; transform: translateY(8px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes flameFlicker {
    0%, 100% { transform: scale(1) rotate(-3deg); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.55)); }
    50% { transform: scale(1.1) rotate(4deg); filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.85)); }
  }
  .tab-btn-in {
    animation: tabBtnIn 220ms ${DOUGH_EASE} both;
    will-change: transform, opacity;
  }
  .panel-in {
    animation: panelIn 220ms ${DOUGH_EASE} both;
    will-change: transform, opacity;
  }
  .dashboard-tab {
    transition: transform 180ms ease, background-color 180ms ease, border-color 180ms ease, color 180ms ease;
    will-change: transform;
  }
  .dashboard-tab:hover {
    transform: translateY(-1px);
  }
  @media (prefers-reduced-motion: reduce) {
    .tab-btn-in, .panel-in, .dashboard-tab {
      animation: none !important;
      transition: none !important;
    }
  }
`;

const INITIAL_HERO = {
  titleHighlight: 'La mejor pizza a la piedra',
  titleMain: 'que buscás está acá',
  badgeYears: 'MÁS DE 10 AÑOS',
  badgeText: 'compartiendo con vos',
  description:
    'Nuestra pizzería familiar se ha convertido en un referente de la ciudad, ofreciendo las mejores pizzas a la piedra elaboradas con harina seleccionada y fermentación lenta.',
  bgImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop',
};

const INITIAL_STEPS = [
  { step: '01', title: '48 HORAS · MASA Y LEUDADO', desc: 'Fermentación lenta en frío para lograr una masa liviana.', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' },
  { step: '02', title: '100% ARTESANAL · INGREDIENTES FRESCOS', desc: 'Muzzarella de primera marca y salsa casera.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002' },
  { step: '03', title: 'PRE-COCCIÓN · GOLPE DE HORNO', desc: 'Base cocida a alta temperatura.', image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212' },
  { step: '04', title: 'LISTAS PARA HOY · DIRECTO A TU HORNO', desc: 'Las guardás en el freezer y listas en minutos.', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38' },
];

const TABS = [
  { id: 'metrics', label: 'Métricas', icon: BarChart3 },
  { id: 'hero', label: 'Portada', icon: ImageIcon },
  { id: 'steps', label: 'Nuestro Oficio', icon: BookOpen },
  { id: 'menu', label: 'La Carta', icon: Pizza },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
];

export const DashboardPage = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('metrics');
  const [panelKey, setPanelKey] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [stats, setStats] = useState({ views: 0, clicks: 0, conversionRate: '0%' });
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  const [heroData, setHeroData] = useState(INITIAL_HERO);
  const [stepsData, setStepsData] = useState(INITIAL_STEPS);
  const [whatsappPhone, setWhatsappPhone] = useState('+54 9 341 555-0199');
  const [loadingContent, setLoadingContent] = useState(true);

  // Solo para mostrar el contador "(N)" en el tab y el card de métricas.
  // MenuEditorTab maneja su propia data de pizzas de forma independiente.
  const [pizzaCount, setPizzaCount] = useState(0);
  const [activePizzaCount, setActivePizzaCount] = useState(0);

  const normalizeSteps = (value) => {
    if (Array.isArray(value)) return value;
    if (value && Array.isArray(value.steps)) return value.steps;
    return INITIAL_STEPS;
  };

  const refreshPizzaCounts = async () => {
    try {
      const data = await pizzaService.getAll();
      const list = Array.isArray(data) ? data : [];
      setPizzaCount(list.length);
      setActivePizzaCount(list.filter((p) => p.available).length);
    } catch (error) {
      console.error('Error contando pizzas:', error);
    }
  };

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const [heroRes, stepsRes, whatsappRes] = await Promise.all([
          API.get('/landing/hero').catch(() => ({ data: INITIAL_HERO })),
          API.get('/landing/oficio').catch(() => ({ data: { steps: INITIAL_STEPS } })),
          API.get('/landing/whatsapp').catch(() => ({ data: { phone: '+54 9 341 555-0199' } })),
        ]);

        setHeroData(heroRes.data || INITIAL_HERO);
        setStepsData(normalizeSteps(stepsRes.data));
        setWhatsappPhone(whatsappRes.data?.phone || whatsappRes.data?.phoneNumber || '+54 9 341 555-0199');
      } catch (error) {
        console.error('Error cargando contenido del dashboard:', error);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchDashboardContent();
    refreshPizzaCounts();

    // Si se edita/borra una pizza desde MenuEditorTab, refrescamos el contador acá también
    const handleLandingRefresh = () => refreshPizzaCounts();
    window.addEventListener('landing:refresh', handleLandingRefresh);
    return () => window.removeEventListener('landing:refresh', handleLandingRefresh);
  }, []);

  const refreshLandingFromDashboard = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('landing:refresh'));
    }
  };

  const saveHero = async (_field, payload) => {
    let bgImage = payload.bgImage;

    if (payload.bgImageFile) {
      bgImage = await uploadImage(payload.bgImageFile);
    }

    const dtoPayload = {
      titleHighlight: payload.titleHighlight,
      titleMain: payload.titleMain,
      badgeYears: payload.badgeYears,
      badgeText: payload.badgeText,
      description: payload.description,
      bgImage,
    };

    const response = await API.put('/landing/hero', dtoPayload);
    setHeroData({ ...response.data, bgImagePreview: null, bgImageFile: null });
    refreshLandingFromDashboard();
  };

  const saveSteps = async (stepsInput) => {
    const safeSteps = Array.isArray(stepsInput) ? stepsInput : Array.isArray(stepsData) ? stepsData : INITIAL_STEPS;

    const uploadPromises = safeSteps.map(async (step) => {
      if (!step.imageFile) {
        return {
          ...step,
          description: step.description ?? step.desc ?? '',
          desc: step.desc ?? step.description ?? '',
          image: step.image || '',
        };
      }

      const uploadedUrl = await uploadImage(step.imageFile);
      return {
        ...step,
        description: step.description ?? step.desc ?? '',
        desc: step.desc ?? step.description ?? '',
        image: uploadedUrl || step.image || '',
      };
    });

    const normalizedSteps = await Promise.all(uploadPromises);

    const response = await API.put('/landing/oficio', {
      steps: normalizedSteps.map((step) => ({
        ...step,
        image: step.image || '',
        description: step.description ?? step.desc ?? '',
        desc: step.desc ?? step.description ?? '',
      })),
    });

    setStepsData(normalizeSteps(response.data));
    refreshLandingFromDashboard();
  };

  const saveWhatsapp = async (phone) => {
    const normalized = phone || '+54 9 341 555-0199';
    const response = await API.put('/landing/whatsapp', { phoneNumber: normalized });
    setWhatsappPhone(response.data?.phone || response.data?.phoneNumber || normalized);
    refreshLandingFromDashboard();
  };

  useEffect(() => {
    if (activeTab === 'metrics') {
      const fetchMetrics = async () => {
        setLoadingMetrics(true);
        try {
          const data = await getAnalyticsStats();
          if (data) {
            setStats(data);
          }
        } catch (error) {
          console.error('Error al cargar métricas:', error);
        } finally {
          setLoadingMetrics(false);
        }
      };

      fetchMetrics();
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const changeTab = (id) => {
    setActiveTab(id);
    setPanelKey((k) => k + 1);
    setIsMobileNavOpen(false);
    if (id === 'menu') refreshPizzaCounts();
  };

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none overflow-x-hidden">
      <style>{STYLE}</style>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-36 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #d97706 2px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <header className="sticky top-0 z-40 bg-stone-950/85 border-b border-stone-800/80 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between backdrop-blur-md shadow-lg shadow-black/40">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            aria-label="Abrir menú del panel"
            className="sm:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-stone-800 bg-stone-900 text-stone-200 shadow-sm transition-colors"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>

          <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-500 shadow-inner shrink-0">
            <Flame className="w-5 h-5" style={{ animation: 'flameFlicker 2s ease-in-out infinite' }} />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif font-black uppercase text-sm sm:text-base tracking-wider text-stone-100 truncate">
                IL FORNO
              </h1>
              <span className="bg-amber-950/70 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-800/50 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3 h-3" /> ADMIN
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400 truncate">
              Panel de Control Interno
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-300 px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all border border-stone-800 cursor-pointer hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <LogOut className="w-4 h-4 text-stone-400" />
          <span className="hidden sm:inline font-semibold">Salir</span>
        </button>
      </header>

      {isMobileNavOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="sm:hidden fixed inset-0 z-40 bg-black/45"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <aside
        className={`sm:hidden fixed left-0 top-16 bottom-0 z-50 w-[79%] max-w-xs bg-stone-950/95 border-r border-stone-800/80 p-4 shadow-2xl shadow-black/60 transition-transform duration-200 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-3 pt-2">
          {TABS.map(({ id, label, icon: Icon }) => {
            const count = id === 'menu' ? ` (${pizzaCount})` : '';
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                onClick={() => changeTab(id)}
                className={`dashboard-tab tab-btn-in flex w-full items-center justify-between gap-3 rounded-2xl border px-3 py-3 text-left text-xs font-mono uppercase tracking-wider ${
                  isActive
                    ? 'border-stone-100 bg-stone-100 text-stone-950 font-bold'
                    : 'border-stone-800 bg-stone-900/60 text-stone-300 hover:bg-stone-900'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  {label}
                </span>
                {count && <span className="text-[10px] opacity-80">{pizzaCount}</span>}
              </button>
            );
          })}
        </div>
      </aside>

      <main className="relative z-10 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6 flex-1">
        <div className="hidden sm:block border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1.5 py-1.5 -mx-1.5">
            {TABS.map(({ id, label, icon: Icon }, i) => {
              const count = id === 'menu' ? ` (${pizzaCount})` : '';
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => changeTab(id)}
                  className={`dashboard-tab tab-btn-in flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-stone-100 text-stone-950 font-bold shadow-lg shadow-black/40'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800/60 hover:bg-stone-900'
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{label}{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={panelKey} className="panel-in">
          {activeTab === 'metrics' && (
            <MetricsTab 
              stats={stats} 
              loading={loadingMetrics}
              activePizzasCount={activePizzaCount} 
            />
          )}

          {activeTab === 'hero' && (
            <HeroEditorTab
              heroData={heroData}
              setHeroData={setHeroData}
              onSave={saveHero}
            />
          )}

          {activeTab === 'steps' && (
            <StepsEditorTab
              stepsData={stepsData}
              setStepsData={setStepsData}
              onSave={saveSteps}
            />
          )}

          {activeTab === 'menu' && <MenuEditorTab />}

          {activeTab === 'whatsapp' && (
            <WhatsappTab phone={whatsappPhone} setPhone={setWhatsappPhone} onSave={() => saveWhatsapp(whatsappPhone)} />
          )}
        </div>
      </main>
    </div>
  );
};