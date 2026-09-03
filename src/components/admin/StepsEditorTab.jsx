import React, { useState } from 'react';
import { Save, Upload, Image as ImageIcon, BookOpen, AlertCircle, Loader2 } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes blockIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes cardIn {
    0% { opacity: 0; transform: translateY(16px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fieldErrorIn {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .block-in { animation: blockIn 650ms ${DOUGH_EASE} both; }
  .card-in { animation: cardIn 600ms ${DOUGH_EASE} both; }
  .field-error-in { animation: fieldErrorIn 200ms ease-out both; }
`;

export const StepsEditorTab = ({ stepsData, setStepsData, onSave }) => {
  const [stepsErrors, setStepsErrors] = useState({});
  const [stepsTouched, setStepsTouched] = useState({});
  const [savingSteps, setSavingSteps] = useState(false);

  const validateSteps = (dataList) => {
    const errs = {};
    dataList.forEach((step, idx) => {
      const stepErrs = {};
      if (!step.title?.trim()) stepErrs.title = 'El título del paso es obligatorio.';
      if (!step.desc?.trim()) {
        stepErrs.desc = 'La descripción es obligatoria.';
      } else if (step.desc.trim().length < 10) {
        stepErrs.desc = 'Mínimo 10 caracteres.';
      }
      if (!step.previewImage && !step.image) {
        stepErrs.image = 'La foto del paso es obligatoria.';
      }
      if (Object.keys(stepErrs).length > 0) {
        errs[idx] = stepErrs;
      }
    });
    return errs;
  };

  const markStepTouched = (index, field) => {
    setStepsTouched((prev) => ({
      ...prev,
      [index]: { ...prev[index], [field]: true },
    }));
    setStepsErrors(validateSteps(stepsData));
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...stepsData];
    updated[index] = { ...updated[index], [field]: value };
    setStepsData(updated);

    if (stepsTouched[index]?.[field]) {
      const errs = validateSteps(updated);
      setStepsErrors((prev) => ({
        ...prev,
        [index]: { ...prev[index], [field]: errs[index]?.[field] },
      }));
    }
  };

  const handleStepImageChange = (index, file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    const updated = [...stepsData];
    updated[index] = {
      ...updated[index],
      previewImage: previewUrl,
      imageFile: file,
    };
    setStepsData(updated);

    setStepsTouched((prev) => ({
      ...prev,
      [index]: { ...prev[index], image: true },
    }));

    const errs = validateSteps(updated);
    setStepsErrors((prev) => ({
      ...prev,
      [index]: { ...prev[index], image: errs[index]?.image },
    }));
  };

  const handleSaveSteps = () => {
    const allTouched = {};
    stepsData.forEach((_, idx) => {
      allTouched[idx] = { title: true, desc: true, image: true };
    });
    setStepsTouched(allTouched);

    const errs = validateSteps(stepsData);
    setStepsErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSavingSteps(true);
    setTimeout(() => {
      onSave && onSave('steps', stepsData);
      setSavingSteps(false);
    }, 500);
  };

  const stepInputClass = (error) =>
    `w-full bg-stone-950/80 border rounded-2xl px-3.5 py-2.5 text-xs text-stone-100 font-mono placeholder-stone-600 focus:outline-none transition-all duration-200 ${
      error
        ? 'border-red-800/80 focus:border-red-500 bg-red-950/10'
        : 'border-stone-800/90 focus:border-amber-500/80 focus:bg-stone-950'
    }`;

  const FieldError = ({ message }) =>
    message ? (
      <p className="field-error-in flex items-center gap-1.5 text-[10px] font-mono text-red-400 mt-1.5">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {message}
      </p>
    ) : null;

  return (
    <div className="block-in relative bg-stone-900/40 border border-stone-800/90 p-6 sm:p-8 rounded-3xl space-y-7 backdrop-blur-sm overflow-hidden">
      <style>{STYLE}</style>

      {/* Glow de fondo amber */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1.5 bg-amber-950/50 border border-amber-900/50 px-2.5 py-1 rounded-full">
              <BookOpen className="w-3.5 h-3.5" />
              Proceso Artesanal
            </span>
          </div>
          <h2 className="text-2xl font-serif font-black tracking-tight text-stone-100">
            Sección "Nuestro Oficio"
          </h2>
          <p className="text-xs font-mono text-stone-400">
            Gestiona los 4 pasos clave de la elaboración.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveSteps}
          disabled={savingSteps}
          title="Guardar Pasos del Oficio"
          className="bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs uppercase font-mono tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-70 shrink-0"
        >
          {savingSteps ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-stone-950" /> Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-stone-950" /> Guardar Cambios
            </>
          )}
        </button>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {stepsData.map((stepItem, index) => {
          const stepErr = stepsErrors[index] || {};
          const hasImg = stepItem.previewImage || stepItem.image;

          return (
            <div
              key={stepItem.step || index}
              className="card-in bg-stone-900/50 border border-stone-800/80 hover:border-stone-700 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 relative group"
              style={{ animationDelay: `${100 + index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-stone-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

              <div className="flex items-center justify-between border-b border-stone-800/60 pb-3 relative z-10">
                <span className="text-amber-500 font-mono font-bold text-xs tracking-wider">
                  PASO 0{stepItem.step || index + 1}
                </span>
                <span className="text-[10px] font-mono text-stone-500 font-semibold uppercase tracking-wider">
                  FICHA DE PROCESO
                </span>
              </div>

              <div className="flex gap-4 items-start relative z-10">
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl border border-stone-800 overflow-hidden bg-stone-950 relative group/img">
                      {hasImg ? (
                        <img src={hasImg} alt="Preview" className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-stone-600" />
                        </div>
                      )}

                      <label className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <Upload className="w-4 h-4 text-stone-200" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleStepImageChange(index, e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                  <FieldError message={stepErr.image} />
                </div>

                <div className="flex-1 space-y-1.5 min-w-0">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                    Título <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={stepItem.title || ''}
                    onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                    onBlur={() => markStepTouched(index, 'title')}
                    className={stepInputClass(stepErr.title)}
                    placeholder="Ej: Fermentación Lenta"
                  />
                  <FieldError message={stepErr.title} />
                </div>
              </div>

              <div className="space-y-1.5 relative z-10">
                <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                  Descripción <span className="text-amber-500">*</span>
                </label>
                <textarea
                  rows="2"
                  value={stepItem.desc || ''}
                  onChange={(e) => handleStepChange(index, 'desc', e.target.value)}
                  onBlur={() => markStepTouched(index, 'desc')}
                  className={`${stepInputClass(stepErr.desc)} resize-none`}
                  placeholder="Detalla el secreto de este paso..."
                />
                <FieldError message={stepErr.desc} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};