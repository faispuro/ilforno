import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Flame, BarChart3, Image as ImageIcon, BookOpen, Pizza, MessageSquare, ShieldCheck } from 'lucide-react';
import API from '../../services/api';

import { MetricsTab } from '../../components/admin/MetricsTab';
import { HeroEditorTab } from '../../components/admin/HeroEditorTab';
import { StepsEditorTab } from '../../components/admin/StepsEditorTab';
import { MenuEditorTab } from '../../components/admin/MenuEditorTab';
import { WhatsappTab } from '../../components/admin/WhatsappTab';
import { getAnalyticsStats } from '../../services/analyticsService';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes tabBtnIn {
    0% { opacity: 0; transform: translateY(-10px) scale(0.92); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes panelIn {
    0% { opacity: 0; transform: translateY(16px) scale(0.98); filter: blur(3px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes flameFlicker {
    0%, 100% { transform: scale(1) rotate(-3deg); filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)); }
    50% { transform: scale(1.15) rotate(4deg); filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.9)); }
  }
  .tab-btn-in { animation: tabBtnIn 500ms ${DOUGH_EASE} both; }
  .panel-in { animation: panelIn 450ms ${DOUGH_EASE} both; }
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

const INITIAL_PIZZAS = [];

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

  // 2. Estado para almacenar las métricas reales
  const [stats, setStats] = useState({ views: 0, clicks: 0, conversionRate: '0%' });
  const [loadingMetrics, setLoadingMetrics] = useState(false);

  const [heroData, setHeroData] = useState(INITIAL_HERO);
  const [stepsData, setStepsData] = useState(INITIAL_STEPS);
  const [pizzas, setPizzas] = useState(INITIAL_PIZZAS);
  const [whatsappPhone, setWhatsappPhone] = useState('+54 9 341 555-0199');
  const [loadingContent, setLoadingContent] = useState(true);

  const normalizeSteps = (value) => {
    if (Array.isArray(value)) return value;
    if (value && Array.isArray(value.steps)) return value.steps;
    return INITIAL_STEPS;
  };

  useEffect(() => {
    const fetchDashboardContent = async () => {
      try {
        const [heroRes, stepsRes, pizzasRes, whatsappRes] = await Promise.all([
          API.get('/landing/hero').catch(() => ({ data: INITIAL_HERO })),
          API.get('/landing/oficio').catch(() => ({ data: { steps: INITIAL_STEPS } })),
          API.get('/pizzas').catch(() => ({ data: [] })),
          API.get('/landing/whatsapp').catch(() => ({ data: { phone: '+54 9 341 555-0199' } })),
        ]);

        setHeroData(heroRes.data || INITIAL_HERO);
        setStepsData(normalizeSteps(stepsRes.data));
        setPizzas((pizzasRes.data || []).map((pizza) => ({
          ...pizza,
          id: pizza.id,
          orderNumber: String(pizza.orderNumber),
          price: Number(pizza.price || 0),
          available: pizza.available ?? true,
          previewImage: pizza.previewImage || pizza.image,
        })));
        setWhatsappPhone(whatsappRes.data?.phone || whatsappRes.data?.phoneNumber || '+54 9 341 555-0199');
      } catch (error) {
        console.error('Error cargando contenido del dashboard:', error);
      } finally {
        setLoadingContent(false);
      }
    };

    fetchDashboardContent();
  }, []);

  useEffect(() => {
    if (!loadingContent) {
      const persistContent = async () => {
        try {
          const safeSteps = Array.isArray(stepsData) ? stepsData : INITIAL_STEPS;
          await Promise.all([
            API.put('/landing/hero', {
              titleHighlight: heroData.titleHighlight,
              titleMain: heroData.titleMain,
              badgeYears: heroData.badgeYears,
              badgeText: heroData.badgeText,
              description: heroData.description,
              bgImage: heroData.bgImage,
            }),
            API.put('/landing/oficio', {
              steps: safeSteps.map((step) => ({
                ...step,
                description: step.description ?? step.desc ?? '',
                desc: step.desc ?? step.description ?? '',
              })),
            }),
            API.put('/landing/whatsapp', { phoneNumber: whatsappPhone }),
          ]);
        } catch (error) {
          console.error('Error persisting landing content:', error);
        }
      };

      persistContent();
    }
  }, [heroData, stepsData, whatsappPhone, loadingContent]);

  const saveHero = async (field, payload) => {
    const updated = { ...heroData, ...payload };
    setHeroData(updated);
    await API.put('/landing/hero', updated);
  };

  const saveSteps = async (payload) => {
    const safeSteps = Array.isArray(payload) ? payload : INITIAL_STEPS;
    setStepsData(safeSteps);
    await API.put('/landing/oficio', {
      steps: safeSteps.map((step) => ({
        ...step,
        description: step.description ?? step.desc ?? '',
        desc: step.desc ?? step.description ?? '',
      })),
    });
  };

  const saveWhatsapp = async (phone) => {
    const normalized = phone || '+54 9 341 555-0199';
    setWhatsappPhone(normalized);
    await API.put('/landing/whatsapp', { phoneNumber: normalized });
  };

  const savePizza = async (pizzaData, currentPizza) => {
    const payload = {
      ...pizzaData,
      price: Number(pizzaData.price || 0),
      image: pizzaData.image || pizzaData.previewImage,
      available: pizzaData.available ?? true,
    };

    if (currentPizza?.id) {
      const response = await API.put(`/pizzas/${currentPizza.id}`, payload);
      setPizzas((prev) => prev.map((item) => (item.id === currentPizza.id ? { ...item, ...response.data } : item)));
      return response.data;
    }

    const response = await API.post('/pizzas', payload);
    setPizzas((prev) => [...prev, { ...response.data, orderNumber: String(response.data.orderNumber) }]);
    return response.data;
  };

  const deletePizza = async (id) => {
    await API.delete(`/pizzas/${id}`);
    setPizzas((prev) => prev.filter((item) => item.id !== id));
  };

  const togglePizzaStatus = async (id) => {
    const target = pizzas.find((pizza) => pizza.id === id);
    if (!target) return;

    const updated = await API.put(`/pizzas/${id}`, { ...target, available: !target.available, price: Number(target.price || 0) });
    setPizzas((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated.data, available: updated.data.available } : item)));
  };

  // 3. Cargar métricas reales cuando la pestaña activa sea 'metrics'
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

  const changeTab = (id) => {
    setActiveTab(id);
    setPanelKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none overflow-x-hidden">
      <style>{STYLE}</style>

      {/* Glow ambiental superior */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-36 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Textura de fondo sutil */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, #d97706 2px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Header Admin */}
      <header className="sticky top-0 z-40 bg-stone-950/85 border-b border-stone-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md shadow-lg shadow-black/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-950/60 border border-amber-800/50 flex items-center justify-center text-amber-500 shadow-inner">
            <Flame className="w-5 h-5" style={{ animation: 'flameFlicker 2s ease-in-out infinite' }} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-black uppercase text-base tracking-wider text-stone-100">
                IL FONDO
              </h1>
              <span className="bg-amber-950/70 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-amber-800/50 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3 h-3" /> ADMIN
              </span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              Panel de Control Interno
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-300 px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all border border-stone-800 cursor-pointer hover:scale-[1.02] active:scale-95 shadow-sm"
        >
          <LogOut className="w-4 h-4 text-stone-400" />
          <span className="hidden sm:inline font-semibold">Salir</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6 flex-1">
        {/* Contenedor de Pestañas */}
        <div className="border-b border-stone-800/80 pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1.5 py-1.5 -mx-1.5">
            {TABS.map(({ id, label, icon: Icon }, i) => {
              const count = id === 'menu' ? ` (${pizzas.length})` : '';
              const isActive = activeTab === id;

              return (
                <button
                  key={id}
                  onClick={() => changeTab(id)}
                  className={`tab-btn-in flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-stone-100 text-stone-950 font-bold shadow-lg shadow-black/40 scale-105'
                      : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 border border-stone-800/60 hover:bg-stone-900 hover:scale-[1.02]'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                  <span>{label}{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pestañas Renderizadas */}
        <div key={panelKey} className="panel-in">
          {activeTab === 'metrics' && (
            // 4. Pasar las métricas reales y el estado de carga
            <MetricsTab 
              stats={stats} 
              loading={loadingMetrics}
              activePizzasCount={pizzas.filter((p) => p.available).length} 
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

          {activeTab === 'menu' && (
            <MenuEditorTab
              pizzas={pizzas}
              setPizzas={setPizzas}
              onToggleStatus={togglePizzaStatus}
              onSave={savePizza}
              onDelete={deletePizza}
            />
          )}

          {activeTab === 'whatsapp' && (
            <WhatsappTab phone={whatsappPhone} setPhone={setWhatsappPhone} onSave={() => saveWhatsapp(whatsappPhone)} />
          )}
        </div>
      </main>
    </div>
  );
};