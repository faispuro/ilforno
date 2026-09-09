import React, { useState } from 'react';
import { Save, Upload, Image as ImageIcon, BookOpen, Loader2, Plus, Trash2 } from 'lucide-react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { ActionToast } from '../ui/ActionToast';
import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal';

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
  .block-in { animation: blockIn 650ms ${DOUGH_EASE} both; }
  .card-in { animation: cardIn 600ms ${DOUGH_EASE} both; }
`;

const MAX_STEPS = 4;

export const StepsEditorTab = ({ stepsData, setStepsData, onSave }) => {
  const { isSaving, toast, submitWithToast, setToast } = useFormSubmit();
  const safeSteps = Array.isArray(stepsData) ? stepsData : [];
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

  const handleStepChange = (index, field, value) => {
    const updated = [...safeSteps];
    updated[index] = { ...updated[index], [field]: value };
    setStepsData(updated);
  };

  const handleStepImageChange = (index, file) => {
    if (!file) return;

    if (safeSteps[index]?.previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(safeSteps[index].previewImage);
    }

    const previewUrl = URL.createObjectURL(file);
    const updated = [...safeSteps];
    updated[index] = {
      ...updated[index],
      previewImage: previewUrl,
      imageFile: file,
    };
    setStepsData(updated);
  };

  const handleAddStep = () => {
    if (safeSteps.length >= MAX_STEPS) {
      setToast({ type: 'error', message: 'Máximo 4 pasos en “Nuestro Oficio”.' });
      setTimeout(() => setToast(null), 4500);
      return;
    }

    const nextIndex = safeSteps.length + 1;
    const newStep = {
      step: String(nextIndex).padStart(2, '0'),
      title: '',
      desc: '',
      image: '',
    };

    setStepsData([...safeSteps, newStep]);
  };

  const handleRemoveStep = (index) => {
    setPendingDeleteIndex(index);
  };

  const confirmRemoveStep = () => {
    if (pendingDeleteIndex === null) return;

    const removed = safeSteps[pendingDeleteIndex];

    if (removed?.previewImage?.startsWith('blob:')) {
      URL.revokeObjectURL(removed.previewImage);
    }

    const updated = safeSteps.filter((_, i) => i !== pendingDeleteIndex);
    const reordered = updated.map((step, index) => ({
      ...step,
      step: String(index + 1).padStart(2, '0'),
    }));

    setStepsData(reordered.length ? reordered : [{ step: '01', title: '', desc: '', image: '' }]);
    setPendingDeleteIndex(null);
  };

  const handleSaveSteps = async () => {
    await submitWithToast(
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (onSave) {
          await onSave(Array.isArray(stepsData) ? stepsData : safeSteps);
        }
      },
      {
        successMessage: '¡Cambios guardados con éxito!',
        errorMessage: 'No se pudieron guardar los cambios. Inténtalo de nuevo.',
      }
    );
  };

  const stepInputClass =
    'w-full bg-stone-950/80 border border-stone-800/90 focus:border-amber-500/80 focus:bg-stone-950 rounded-2xl px-3.5 py-2.5 text-xs text-stone-100 font-mono placeholder-stone-600 focus:outline-none transition-all duration-200';

  return (
    <>
      <ActionToast toast={toast} />

      <div className="block-in relative bg-stone-900/40 border border-stone-800/90 p-6 sm:p-8 rounded-3xl space-y-7 backdrop-blur-sm overflow-hidden">
        <style>{STYLE}</style>

        <ConfirmDeleteModal
          isOpen={pendingDeleteIndex !== null}
          onClose={() => setPendingDeleteIndex(null)}
          onConfirm={confirmRemoveStep}
          itemName={safeSteps[pendingDeleteIndex]?.title || `el paso ${String((pendingDeleteIndex ?? 0) + 1).padStart(2, '0')}`}
          isDeleting={isSaving}
          title="¿Eliminar paso?"
          description="Estás por eliminar este paso de “Nuestro Oficio”. Al confirmarlo, los pasos siguientes se reordenarán automáticamente."
        />

        <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddStep}
              disabled={isSaving || safeSteps.length >= MAX_STEPS}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[10px] uppercase font-mono tracking-wider px-3 py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
              title={safeSteps.length >= MAX_STEPS ? 'Máximo 4 pasos' : 'Agregar paso'}
            >
              <Plus className="w-3.5 h-3.5" /> {safeSteps.length >= MAX_STEPS ? 'Límite alcanzado' : 'Agregar paso'}
            </button>

            <button
              type="button"
              onClick={handleSaveSteps}
              disabled={isSaving}
              title="Guardar Pasos del Oficio"
              className="bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs uppercase font-mono tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-70 disabled:pointer-events-none shrink-0"
            >
              {isSaving ? (
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
        </div>

        <fieldset disabled={isSaving} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 border-none p-0 m-0 disabled:opacity-60 disabled:pointer-events-none">
          {safeSteps.map((stepItem, index) => {
            const hasImg = stepItem.previewImage || stepItem.image;

            return (
              <div
                key={`${stepItem.step || 'step'}-${index}`}
                className="card-in bg-stone-900/50 border border-stone-800/80 hover:border-stone-700 rounded-3xl p-5 space-y-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 relative group"
                style={{ animationDelay: `${100 + index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-linear-to-br from-stone-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />

                <div className="flex items-center justify-between border-b border-stone-800/60 pb-3 relative z-10">
                  <span className="text-amber-500 font-mono font-bold text-xs tracking-wider">
                    PASO {String(stepItem.step || index + 1).padStart(2, '0')}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveStep(index)}
                    className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-900/40 rounded-lg transition-colors cursor-pointer"
                    aria-label="Eliminar paso"
                    title="Eliminar paso"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex gap-4 items-start relative z-10">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl border border-stone-800 overflow-hidden bg-stone-950 relative group/img">
                        {hasImg ? (
                          <img
                            src={hasImg}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                          />
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
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Número
                    </label>
                    <input
                      type="text"
                      value={stepItem.step || ''}
                      onChange={(e) => handleStepChange(index, 'step', e.target.value)}
                      className={stepInputClass}
                      placeholder="01"
                    />

                    <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Título
                    </label>
                    <input
                      type="text"
                      value={stepItem.title || ''}
                      onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                      className={stepInputClass}
                      placeholder="Ej: Fermentación Lenta"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 relative z-10">
                  <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                    Descripción
                  </label>
                  <textarea
                    rows="2"
                    value={stepItem.desc || stepItem.description || ''}
                    onChange={(e) => handleStepChange(index, 'desc', e.target.value)}
                    className={`${stepInputClass} resize-none`}
                    placeholder="Detalla el secreto de este paso..."
                  />
                </div>
              </div>
            );
          })}
        </fieldset>
      </div>
    </>
  );
};