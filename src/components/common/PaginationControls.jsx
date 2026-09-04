import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800/80 pt-4 relative z-10 shrink-0">
      {/* Contador de elementos */}
      <span className="text-xs font-mono text-stone-400">
        Mostrando <span className="text-amber-500 font-bold">{startItem}-{endItem}</span> de{' '}
        <span className="text-stone-200 font-bold">{totalItems}</span> pizzas
      </span>

      {/* Controles de navegación */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Página anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Botones numéricos de página */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`w-8 h-8 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 border border-amber-500 shadow-md shadow-amber-950/40'
                    : 'bg-stone-950 text-stone-400 hover:text-stone-100 border border-stone-800 hover:border-stone-700'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          title="Página siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};