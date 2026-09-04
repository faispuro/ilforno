// src/components/ui/ActionToast.jsx
import React from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const ActionToast = ({ toast }) => {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  const content = (
    <>
      <style>{`
        @keyframes toastSlideInRight {
          0% {
            opacity: 0;
            transform: translateX(60px) scale(0.92);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        .animate-toast-in {
          animation: toastSlideInRight 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="fixed top-6 right-6 z-9999 pointer-events-none">
        <div
          className={`animate-toast-in px-5 py-3.5 rounded-2xl border text-xs font-mono font-bold flex items-center gap-3 shadow-2xl backdrop-blur-md transition-all ${
            isSuccess
              ? 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200 shadow-emerald-950/50'
              : 'bg-red-950/95 border-red-500/60 text-red-200 shadow-red-950/50'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
};