import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Upload,
  UtensilsCrossed,
  Loader2,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { PizzaModal } from './PizzaModal';
import { ConfirmDeleteModal } from '../ui/ConfirmDeleteModal';
import { PaginationControls } from '../common/PaginationControls';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import { ActionToast } from '../ui/ActionToast';
import { pizzaService } from '../../services/pizzasService';
import { uploadImage } from '../../services/uploadService';

const DEFAULT_ITEMS_PER_PAGE = 4;
const MOBILE_ITEMS_PER_PAGE = 3;
const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes blockIn {
    0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(2px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  .block-in { animation: blockIn 650ms ${DOUGH_EASE} both; }
`;

const sanitizeImageValue = (value, fallback = '') => {
  if (typeof value !== 'string') return fallback;
  if (value.startsWith('blob:')) return fallback;
  return value || fallback;
};

const buildPayload = ({ orderNumber, name, price, description, tagBadge, image, available }) => ({
  orderNumber: Number(orderNumber),
  name: name?.trim(),
  price: Number(price),
  description: description?.trim(),
  tagBadge: tagBadge?.trim() || undefined,
  image: sanitizeImageValue(image),
  available: available ?? true,
});

const sortPizzasByOrder = (items = []) =>
  [...items].sort((a, b) => Number(a.orderNumber ?? 0) - Number(b.orderNumber ?? 0));

const resolveReorderedPizzaList = (items, currentId, targetOrderNumber) => {
  const currentItem = items.find((item) => item.id === currentId) || null;
  const withoutCurrent = items.filter((item) => item.id !== currentId);

  if (!currentItem) {
    return sortPizzasByOrder(items);
  }

  const nextOrder = Number(targetOrderNumber) || 1;
  const candidate = {
    ...currentItem,
    orderNumber: nextOrder,
  };

  const combined = [...withoutCurrent, candidate];
  return sortPizzasByOrder(combined).map((item, index) => ({
    ...item,
    orderNumber: index + 1,
  }));
};

// Canal para avisar a otras pestañas/ventanas (misma origin) que el contenido cambió
const landingChannel = typeof window !== 'undefined' ? new BroadcastChannel('landing') : null;

// Avisa a LandingContext que vuelva a pedir los datos (así se refleja en la landing sin recargar).
// Dispara tanto un CustomEvent (misma pestaña) como un mensaje de BroadcastChannel (otras pestañas
// del mismo navegador/origen), ya que window.dispatchEvent no cruza pestañas.
const notifyLandingRefresh = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('landing:refresh'));
    landingChannel?.postMessage('refresh');
  }
};

export const MenuEditorTab = () => {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pizzaToEdit, setPizzaToEdit] = useState(null);
  const [pizzaToDelete, setPizzaToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ITEMS_PER_PAGE;
    return window.innerWidth < 768 ? MOBILE_ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE;
  });

  const { isSaving, toast, submitWithToast } = useFormSubmit();

  const totalPages = Math.ceil(pizzas.length / itemsPerPage) || 1;

  const loadPizzas = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await pizzaService.getAll();
      setPizzas(Array.isArray(data) ? sortPizzasByOrder(data) : []);
    } catch (err) {
      console.error('Error cargando el menú:', err);
      setLoadError('No se pudo cargar el menú. Verificá tu conexión e intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPizzas();
  }, [loadPizzas]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const nextItemsPerPage = window.innerWidth < 768 ? MOBILE_ITEMS_PER_PAGE : DEFAULT_ITEMS_PER_PAGE;
      setItemsPerPage(nextItemsPerPage);
      setCurrentPage((prevPage) => Math.min(prevPage, Math.max(1, Math.ceil(pizzas.length / nextItemsPerPage) || 1)));
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [pizzas.length]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [pizzas.length, totalPages, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPizzas = pizzas.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenAdd = () => {
    setPizzaToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pizza) => {
    setPizzaToEdit(pizza);
    setIsModalOpen(true);
  };

  const handleSavePizza = async (pizzaData) => {
    const isEditing = Boolean(pizzaToEdit);

    await submitWithToast(
      async () => {
        let imageUrl = sanitizeImageValue(pizzaData.image, pizzaToEdit?.image || '');

        if (pizzaData.imageFile) {
          const uploadedImage = await uploadImage(pizzaData.imageFile);
          imageUrl = sanitizeImageValue(uploadedImage, pizzaToEdit?.image || '');
        }

        const payload = buildPayload({
          ...pizzaData,
          image: imageUrl,
        });

        if (isEditing) {
          const updatedCurrent = await pizzaService.update(pizzaToEdit.id, {
            ...payload,
            orderNumber: pizzaToEdit.orderNumber,
          });

          const normalizedUpdated = {
            ...updatedCurrent,
            image: sanitizeImageValue(updatedCurrent?.image, imageUrl || pizzaToEdit?.image || ''),
            previewImage: '',
          };

          setPizzas((prev) => sortPizzasByOrder(prev.map((item) => item.id === pizzaToEdit.id ? normalizedUpdated : item)));
        } else {
          const created = await pizzaService.create(payload);
          const normalizedCreated = {
            ...created,
            image: sanitizeImageValue(created?.image, imageUrl || ''),
            previewImage: '',
          };
          setPizzas((prev) => sortPizzasByOrder([...prev, normalizedCreated]));
        }

        notifyLandingRefresh();
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

  const handleRequestDelete = (pizza) => {
    setPizzaToDelete(pizza);
  };

  const handleConfirmDelete = async () => {
    if (!pizzaToDelete) return;
    const { id, name } = pizzaToDelete;

    await submitWithToast(
      async () => {
        await pizzaService.remove(id);
        setPizzas((prev) => sortPizzasByOrder(prev.filter((item) => item.id !== id)));
        notifyLandingRefresh();
      },
      {
        successMessage: `Se eliminó "${name || 'la pizza'}" de la carta.`,
        errorMessage: 'Error al eliminar el producto.',
      }
    );

    setPizzaToDelete(null);
  };

  const handleQuickImageChange = async (id, file) => {
    if (!file) return;

    await submitWithToast(
      async () => {
        const uploadedImage = await uploadImage(file);
        const imageUrl = sanitizeImageValue(uploadedImage, '');

        if (!imageUrl) {
          throw new Error('La imagen subida no tiene una URL válida.');
        }

        const updated = await pizzaService.update(id, { image: imageUrl });
        const normalizedUpdated = {
          ...updated,
          image: sanitizeImageValue(updated?.image, imageUrl),
          previewImage: '',
        };
        setPizzas((prev) => sortPizzasByOrder(prev.map((item) => (item.id === id ? normalizedUpdated : item))));
        notifyLandingRefresh();
      },
      {
        successMessage: 'Fotografía actualizada correctamente.',
        errorMessage: 'Ocurrió un error al cargar la imagen.',
      }
    );
  };

  const handleToggleStatus = async (id, currentStatus) => {
    await submitWithToast(
      async () => {
        const updated = await pizzaService.update(id, { available: !currentStatus });
        setPizzas((prev) => sortPizzasByOrder(prev.map((item) => (item.id === id ? updated : item))));
        notifyLandingRefresh();
      },
      {
        successMessage: currentStatus ? 'Pizza pausada en el menú.' : 'Pizza habilitada en el menú.',
        errorMessage: 'No se pudo cambiar el estado de la pizza.',
      }
    );
  };

  return (
    <>
      <ActionToast toast={toast} />

      <div className="block-in relative bg-stone-900/40 border border-stone-800/90 p-4 sm:p-8 rounded-3xl backdrop-blur-sm overflow-hidden min-h-152 sm:min-h-168 flex flex-col justify-between">
        <style>{STYLE}</style>

        <div className="absolute top-0 right-1/4 w-72 h-32 bg-amber-600/10 blur-3xl pointer-events-none rounded-full" />

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
            disabled={isSaving || isLoading}
            className="bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs uppercase font-mono tracking-wider px-4 py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Plus className="w-4 h-4" /> Agregar Pizza
          </button>
        </div>

        {isLoading && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3 text-stone-400">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            <p className="text-xs font-mono">Cargando el menú...</p>
          </div>
        )}

        {!isLoading && loadError && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="w-11 h-11 rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-xs font-mono text-stone-400 max-w-xs">{loadError}</p>
            <button
              type="button"
              onClick={loadPizzas}
              className="flex items-center gap-2 px-4 py-2 bg-stone-950 hover:bg-stone-800 text-stone-200 text-xs font-mono rounded-xl border border-stone-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reintentar
            </button>
          </div>
        )}

        {!isLoading && !loadError && pizzas.length === 0 && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-2 text-center px-6">
            <UtensilsCrossed className="w-6 h-6 text-stone-600" />
            <p className="text-xs font-mono text-stone-500">Todavía no agregaste ninguna pizza a la carta.</p>
          </div>
        )}

        {!isLoading && !loadError && pizzas.length > 0 && (
          <fieldset disabled={isSaving} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 my-auto min-h-88 content-start border-none p-0 m-0 disabled:opacity-60 disabled:pointer-events-none">
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
                        ${Number(pizza.price).toLocaleString('es-AR')}
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
                      onClick={() => handleRequestDelete(pizza)}
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
        )}

        {!isLoading && !loadError && pizzas.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={pizzas.length}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      <PizzaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePizza}
        pizzaToEdit={pizzaToEdit}
        existingPizzas={pizzas}
      />

      <ConfirmDeleteModal
        isOpen={Boolean(pizzaToDelete)}
        onClose={() => setPizzaToDelete(null)}
        onConfirm={handleConfirmDelete}
        itemName={pizzaToDelete?.name}
        isDeleting={isSaving}
      />
    </>
  );
};