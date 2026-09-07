import React, { useState, useEffect } from 'react';
import { Plus, CheckCircle2, XCircle, Pencil, Trash2, Upload, UtensilsCrossed } from 'lucide-react';
import { PizzaModal } from './PizzaModal';
import { PaginationControls } from '../common/PaginationControls';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { ActionToast } from '../ui/ActionToast';

const ITEMS_PER_PAGE = 4;
const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes blockIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  .block-in { animation: blockIn 650ms ${DOUGH_EASE} both; }
`;

export const MenuEditorTab = ({ pizzas, setPizzas, onToggleStatus }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Integración del Hook de submit/feedback
  const { isSaving, toast, submitWithToast } = useFormSubmit();

  const totalPages = Math.ceil(pizzas.length / ITEMS_PER_PAGE) || 1;

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [pizzas.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPizzas = pizzas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleOpenAdd = () => {
    setPizzaToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pizza) => {
    setPizzaToEdit(pizza);
    setIsModalOpen(true);
  };

  // Guardar (Creación o Edición) con mensaje condicional dinámico
  const handleSavePizza = async (pizzaData) => {
    const isEditing = Boolean(pizzaToEdit);

    await submitWithToast(
      async () => {
        if (isEditing) {
          setPizzas((prev) =>
            prev.map((item) => (item.id === pizzaToEdit.id ? { ...pizzaData, id: pizzaToEdit.id } : item))
          );
        } else {
          const newPizza = {
            ...pizzaData,
            id: Date.now(),
          };
          setPizzas((prev) => [...prev, newPizza]);
        }
      },
      {
        successMessage: isEditing
          ? `¡Pizza "${pizzaData.name}" actualizada con éxito!`
          : `¡Pizza "${pizzaData.name}" agregada a la carta!`,
        errorMessage: isEditing
          ? 'Error al intentar actualizar la pizza.'
          : 'Error al intentar agregar la pizza.',
      }
    );
  };

  // Eliminación de Producto
  const handleDeletePizza = async (id, pizzaName) => {
    await submitWithToast(
      async () => {
        setPizzas((prev) => prev.filter((item) => item.id !== id));
      },
      {
        successMessage: `Se eliminó "${pizzaName || 'la pizza'}" de la carta.`,
        errorMessage: 'Error al eliminar el producto.',
      }
    );
  };

  // Cambio rápido de imagen
  const handleQuickImageChange = async (id, file) => {
    if (!file) return;

    await submitWithToast(
      async () => {
        const previewUrl = URL.createObjectURL(file);
        setPizzas((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, previewImage: previewUrl, imageFile: file } : item
          )
        );
      },
      {
        successMessage: 'Fotografía actualizada correctamente.',
        errorMessage: 'Ocurrió un error al cargar la imagen.',
      }
    );
  };

  // Cambio de disponibilidad
  const handleToggleStatus = async (id, currentStatus) => {
    await submitWithToast(
      async () => {
        if (onToggleStatus) {
          await onToggleStatus(id);
        } else {
          setPizzas((prev) =>
            prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
          );
        }
      },
      {
        successMessage: currentStatus ? 'Pizza pausada en el menú.' : 'Pizza habilitada en el menú.',
        errorMessage: 'No se pudo cambiar el estado de la pizza.',
      }
    );
  };

  return (
    <>
      {/* Notificación Toast flotante */}
      <ActionToast toast={toast} />

      {/* Contenedor Principal con ALTURA FIJA ESTÁTICA (h-145) */}
      <div className="block-in relative bg-stone-900/40 border border-stone-800/90 p-6 sm:p-8 rounded-3xl backdrop-blur-sm overflow-hidden h-145 flex flex-col justify-between">
        <style>{STYLE}</style>

        {/* Glow de fondo */}
        <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

        {/* Header (Fijo arriba) */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800/80 pb-5 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1 bg-amber-950/50 border border-amber-900/50 px-2.5 py-1 rounded-full">
                <UtensilsCrossed className="w-3.5 h-3.5" />
                Gestión de Productos
              </span>
            </div>
            <h2 className="text-2xl font-serif font-black tracking-tight text-stone-100">
              Nuestra Carta
            </h2>
            <p className="text-xs font-mono text-stone-400">
              Control de precios, disponibilidad y fotografías de tus pizzas.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            disabled={isSaving}
            className="bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs uppercase font-mono tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Plus className="w-4 h-4" /> Agregar Pizza
          </button>
        </div>

        {/* Grilla de Pizzas con slots de TAMAÑO FIJO ESTÁTICO */}
        <fieldset disabled={isSaving} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 my-auto h-90 content-start border-none p-0 m-0 disabled:opacity-60 disabled:pointer-events-none">
          {currentPizzas.map((pizza) => (
            <div
              key={pizza.id}
              className="bg-stone-900/50 border border-stone-800/80 hover:border-stone-700 rounded-3xl p-5 flex flex-col justify-between h-42.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 overflow-hidden relative group shrink-0"
            >
              <div className="absolute inset-0 bg-linear-to-br from-stone-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex gap-4 relative z-10 overflow-hidden">
                <div className="w-20 h-20 rounded-2xl border border-stone-800 overflow-hidden bg-stone-950 shrink-0 relative group/img">
                  <img
                    src={pizza.previewImage || pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105"
                  />
                  <label className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <Upload className="w-4 h-4 text-stone-200" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleQuickImageChange(pizza.id, e.target.files[0])}
                    />
                  </label>
                  <span className="absolute top-1 left-1 bg-stone-950/90 text-stone-300 font-mono text-[9px] px-1 py-0.2 rounded border border-stone-800">
                    #{pizza.orderNumber}
                  </span>
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase font-bold bg-red-950/50 text-red-400 border border-red-900/50 px-2 py-0.5 rounded-md truncate">
                      {pizza.tagBadge}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">
                      ${pizza.price.toLocaleString('es-AR')}
                    </span>
                  </div>

                  <h4 className="font-serif font-black text-stone-100 text-sm tracking-tight truncate">
                    {pizza.name}
                  </h4>
                  <p className="text-[11px] font-sans text-stone-400 line-clamp-2 leading-tight">
                    {pizza.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-stone-800/60 pt-2 relative z-10 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(pizza.id, pizza.available)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    pizza.available
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-950/90'
                      : 'bg-stone-800/60 text-stone-500 border border-stone-700/50 hover:bg-stone-800'
                  }`}
                >
                  {pizza.available ? (
                    <>
                      <CheckCircle2 className="w-3 h-3" /> En Menú
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" /> Pausada
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(pizza)}
                    className="p-1.5 text-stone-400 hover:text-stone-100 bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors cursor-pointer"
                    title="Editar Pizza"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePizza(pizza.id, pizza.name)}
                    className="p-1.5 text-red-400 hover:text-red-300 bg-red-950/40 hover:bg-red-950/80 border border-red-900/40 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar Pizza"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </fieldset>

        {/* Paginación (Fija abajo) */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={pizzas.length}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>

      <PizzaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePizza}
        pizzaToEdit={pizzaToEdit}
      />
    </>
  );
};