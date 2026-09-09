import React from 'react';
import { X, AlertTriangle, Loader2, Trash2, ShieldAlert } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes confirmModalIn {
    0% { opacity: 0; transform: translateY(16px) scale(0.97); filter: blur(4px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes confirmOverlayIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .confirm-modal-in { animation: confirmModalIn 320ms ${DOUGH_EASE} both; }
  .confirm-overlay-in { animation: confirmOverlayIn 180ms ease-out both; }
`;

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isDeleting = false,
  title = '¿Eliminar producto?',
  description,
}) => {
  if (!isOpen) return null;

  const handleClose = () => {
    if (isDeleting) return;
    onClose();
  };

  return (
    <div className="confirm-overlay-in fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <style>{STYLE}</style>

      <div className="confirm-modal-in relative bg-stone-900/95 border border-stone-800/90 rounded-3xl w-full max-w-md shadow-2xl shadow-black/80 text-stone-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-24 bg-red-600/10 blur-2xl pointer-events-none rounded-full" />

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-stone-800/80 p-5 sm:p-6 bg-stone-900/80 relative z-10">
          <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest font-bold flex items-center gap-1.5 bg-red-950/50 border border-red-900/50 px-2.5 py-0.5 rounded-full w-fit">
            <ShieldAlert className="w-3 h-3" />
            Acción irreversible
          </span>
          <button
            onClick={handleClose}
            type="button"
            disabled={isDeleting}
            className="p-2 text-stone-400 hover:text-stone-100 bg-stone-950 hover:bg-stone-800 rounded-xl border border-stone-800 transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="relative z-10 p-5 sm:p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-11 h-11 rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="space-y-1.5 pt-0.5">
              <h3 className="font-serif font-black text-xl tracking-tight text-stone-100">
                {title}
              </h3>
              <p className="text-xs font-mono text-stone-400 leading-relaxed">
                {description ?? (
                  <>
                    Estás por eliminar{' '}
                    <span className="text-stone-200 font-semibold">
                      "{itemName || 'esta pizza'}"
                    </span>{' '}
                    de la carta. Esta acción no se puede deshacer.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-stone-800/80 p-5 sm:p-6 bg-stone-900/80 flex justify-end gap-3 relative z-10">
          <button
            type="button"
            onClick={handleClose}
            disabled={isDeleting}
            className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-mono rounded-xl border border-stone-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Eliminar
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};