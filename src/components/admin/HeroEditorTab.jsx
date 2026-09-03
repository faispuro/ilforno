import React, { useState } from 'react';
import { Save, Upload, Flame, AlertCircle, Loader2, RefreshCw, Trash2 } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes blockIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes flameFlicker {
    0%, 100% { transform: scale(1) rotate(-3deg); }
    50% { transform: scale(1.1) rotate(3deg); }
  }
  @keyframes fieldErrorIn {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .block-in { animation: blockIn 650ms ${DOUGH_EASE} both; }
  .field-error-in { animation: fieldErrorIn 200ms ease-out both; }
`;

export const HeroEditorTab = ({ heroData, setHeroData, onSave }) => {
  const [heroErrors, setHeroErrors] = useState({});
  const [heroTouched, setHeroTouched] = useState({});
  const [savingHero, setSavingHero] = useState(false);

  const validateHero = (data) => {
    const errs = {};
    if (!data.titleHighlight?.trim()) errs.titleHighlight = 'El título resaltado es obligatorio.';
    if (!data.titleMain?.trim()) errs.titleMain = 'El título secundario es obligatorio.';
    if (!data.badgeYears?.trim()) errs.badgeYears = 'La insignia de años es obligatoria.';
    if (!data.badgeText?.trim()) errs.badgeText = 'El subtexto es obligatorio.';
    if (!data.description?.trim()) {
      errs.description = 'La descripción breve es obligatoria.';
    } else if (data.description.trim().length < 15) {
      errs.description = 'La descripción debe tener al menos 15 caracteres.';
    }
    return errs;
  };

  const markHeroTouched = (field) => {
    setHeroTouched((prev) => ({ ...prev, [field]: true }));
    setHeroErrors(validateHero(heroData));
  };

  const handleHeroChange = (field, value) => {
    const next = { ...heroData, [field]: value };
    setHeroData(next);
    if (heroTouched[field]) {
      const errs = validateHero(next);
      setHeroErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleHeroBgImageChange = (file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setHeroData({
      ...heroData,
      bgImagePreview: previewUrl,
      bgImageFile: file,
    });
  };

  const handleRemoveHeroBg = () => {
    setHeroData({
      ...heroData,
      bgImagePreview: null,
      bgImageFile: null,
      bgImage: null,
    });
  };

  const handleSaveHero = () => {
    const allTouched = {
      titleHighlight: true,
      titleMain: true,
      badgeYears: true,
      badgeText: true,
      description: true,
    };
    setHeroTouched(allTouched);

    const errs = validateHero(heroData);
    setHeroErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSavingHero(true);
    setTimeout(() => {
      onSave && onSave('hero', heroData);
      setSavingHero(false);
    }, 500);
  };

  const inputClass = (error) =>
    `w-full bg-stone-950/80 border rounded-xl px-4 py-3 text-xs text-stone-100 focus:outline-none transition-all duration-200 ${
      error
        ? 'border-red-500/80 focus:border-red-500 shadow-sm shadow-red-950'
        : 'border-stone-800 focus:border-amber-600/80 focus:ring-1 focus:ring-amber-600/30'
    }`;

  const FieldError = ({ message }) =>
    message ? (
      <p className="field-error-in flex items-center gap-1.5 text-[11px] font-mono text-red-400 mt-1 font-medium">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {message}
      </p>
    ) : null;

  const currentHeroBg = heroData.bgImagePreview || heroData.bgImage;

  return (
    <div className="block-in relative bg-stone-900/40 border border-stone-800/90 p-6 sm:p-8 rounded-3xl space-y-7 backdrop-blur-sm overflow-hidden">
      <style>{STYLE}</style>

      {/* Glow de fondo unificado a Ámbar */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-stone-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1 bg-amber-950/50 border border-amber-900/50 px-2.5 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 text-amber-500" style={{ animation: 'flameFlicker 1.8s ease-in-out infinite' }} />
              Portada Principal
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black tracking-tight text-stone-100">
            Hero & Imagen de Fondo
          </h2>
          <p className="text-xs font-mono text-stone-400">
            Personaliza el encabezado principal y la primera impresión de tus clientes.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveHero}
          disabled={savingHero}
          title="Guardar Cambios del Hero"
          className="group relative w-11 h-11 bg-stone-100 hover:bg-white text-stone-950 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg shadow-black/40 hover:scale-105 active:scale-95 disabled:opacity-70 shrink-0"
        >
          {savingHero ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 transition-transform group-hover:rotate-6" />}
        </button>
      </div>

      <div className="relative z-10 space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold flex items-center justify-between">
          <span>Imagen de Fondo Portada</span>
          <span className="text-[10px] text-stone-500 normal-case font-normal">Recomendado 1920x1080 (JPG/WEBP)</span>
        </label>

        <div className="relative w-full h-48 rounded-2xl border-2 border-dashed border-stone-800 hover:border-amber-600/50 bg-stone-950/60 overflow-hidden group transition-colors flex items-center justify-center">
          {currentHeroBg ? (
            <>
              <img src={currentHeroBg} alt="Fondo Hero" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
                <label className="bg-stone-900/90 hover:bg-amber-600 hover:text-stone-950 text-white p-2.5 rounded-xl border border-stone-700 hover:border-amber-500 cursor-pointer transition-all shadow-md flex items-center gap-2 text-xs font-mono font-medium">
                  <RefreshCw className="w-4 h-4" /> Cambiar Imagen
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleHeroBgImageChange(e.target.files[0])} />
                </label>
                <button
                  type="button"
                  onClick={handleRemoveHeroBg}
                  className="bg-stone-900/90 hover:bg-stone-800 text-red-400 p-2.5 rounded-xl border border-stone-700 cursor-pointer transition-all shadow-md"
                  title="Quitar fondo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center space-y-2">
              <div className="p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-400 group-hover:text-amber-500 group-hover:border-amber-900/50 transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-mono font-medium text-stone-200">Haz clic para subir la imagen de fondo</p>
                <p className="text-[11px] font-mono text-stone-500">O arrastra el archivo aquí</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleHeroBgImageChange(e.target.files[0])} />
            </label>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
            Título Resaltado <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={heroData.titleHighlight || ''}
            onChange={(e) => handleHeroChange('titleHighlight', e.target.value)}
            onBlur={() => markHeroTouched('titleHighlight')}
            className={`${inputClass(heroErrors.titleHighlight)} font-serif font-bold text-sm tracking-wide`}
            placeholder="Ej: PIZZAS ARTESANALES"
          />
          <FieldError message={heroErrors.titleHighlight} />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
            Título Secundario <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={heroData.titleMain || ''}
            onChange={(e) => handleHeroChange('titleMain', e.target.value)}
            onBlur={() => markHeroTouched('titleMain')}
            className={`${inputClass(heroErrors.titleMain)} font-serif font-bold text-sm tracking-wide`}
            placeholder="Ej: AL HORNO DE BARRO"
          />
          <FieldError message={heroErrors.titleMain} />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
            Insignia Años <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={heroData.badgeYears || ''}
            onChange={(e) => handleHeroChange('badgeYears', e.target.value)}
            onBlur={() => markHeroTouched('badgeYears')}
            className={`${inputClass(heroErrors.badgeYears)} font-mono`}
            placeholder="Ej: +15 AÑOS"
          />
          <FieldError message={heroErrors.badgeYears} />
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
            Insignia Subtexto <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={heroData.badgeText || ''}
            onChange={(e) => handleHeroChange('badgeText', e.target.value)}
            onBlur={() => markHeroTouched('badgeText')}
            className={`${inputClass(heroErrors.badgeText)} font-mono`}
            placeholder="Ej: DE TRADICIÓN"
          />
          <FieldError message={heroErrors.badgeText} />
        </div>
      </div>

      <div className="relative z-10 space-y-1">
        <label className="text-[11px] font-mono uppercase tracking-widest text-stone-400 font-semibold">
          Descripción Breve <span className="text-amber-500">*</span>
        </label>
        <textarea
          rows="3"
          value={heroData.description || ''}
          onChange={(e) => handleHeroChange('description', e.target.value)}
          onBlur={() => markHeroTouched('description')}
          className={`${inputClass(heroErrors.description)} p-4 leading-relaxed resize-none font-serif text-sm tracking-wide text-stone-200`}
          placeholder="Escribe una breve presentación atractiva..."
        />
        <FieldError message={heroErrors.description} />
      </div>
    </div>
  );
};