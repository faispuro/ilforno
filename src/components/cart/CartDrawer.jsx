import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  onOpenCheckout 
}) => {
  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleQuantityInput = (index, value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 1) {
      onUpdateQuantity(index, 1);
    } else {
      onUpdateQuantity(index, parsed);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 overflow-hidden">
      {/* Backdrop con desenfoque cálido */}
      <div 
        className="absolute inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-950 text-stone-100 border-l border-stone-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 text-white p-2.5 rounded-xl shadow-lg shadow-red-600/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black font-serif uppercase tracking-tight text-stone-100">Tu Pedido</h2>
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                  IL FONDO • TRATTORIA
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-stone-100 transition-colors border border-stone-800 cursor-pointer"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-stone-800/40 scrollbar-thin scrollbar-thumb-stone-800">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 bg-stone-900 text-stone-600 rounded-2xl border border-stone-800 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-stone-100 font-serif uppercase font-bold text-lg">Tu carrito está vacío</p>
                  <p className="text-stone-400 text-xs">Elegí alguna de nuestras especialidades a la piedra.</p>
                </div>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={index} 
                  className="pt-4 first:pt-0 bg-stone-900/50 p-4 rounded-2xl border border-stone-800/80 space-y-3 shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <img 
                        src={item.pizza.image} 
                        alt={item.pizza.name} 
                        className="w-16 h-16 rounded-xl object-cover border border-stone-800 bg-stone-950"
                      />
                      <div className="space-y-0.5">
                        <h4 className="font-black text-stone-100 font-serif uppercase text-base leading-tight">
                          {item.pizza.name}
                        </h4>
                        <span className="text-xs text-red-500 font-black font-serif block">
                          ${item.unitPrice.toLocaleString('es-AR')} c/u
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(index)}
                      className="text-stone-500 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                      title="Eliminar ítem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Extras / Toppings seleccionados */}
                  {item.selectedToppings && item.selectedToppings.length > 0 && (
                    <div className="text-xs text-stone-300 bg-stone-950/80 p-2.5 rounded-xl border border-stone-800/80">
                      <span className="font-bold text-red-400 uppercase text-[10px] tracking-wider block mb-0.5">
                        Extras:
                      </span>
                      {item.selectedToppings.map(t => t.name).join(', ')}
                    </div>
                  )}

                  {/* Notas aclaratorias */}
                  {item.notes && (
                    <p className="text-xs italic text-amber-400/90 bg-amber-950/20 p-2.5 rounded-xl border border-amber-900/30">
                      "{item.notes}"
                    </p>
                  )}

                  {/* Controles de Cantidad y Precio */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-xl p-1">
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 hover:bg-stone-800 text-stone-400 hover:text-stone-100 disabled:opacity-30 rounded-lg transition-colors cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityInput(index, e.target.value)}
                        className="w-10 text-center bg-transparent font-black text-stone-100 text-xs focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />

                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="p-1 hover:bg-stone-800 text-stone-400 hover:text-stone-100 rounded-lg transition-colors cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="font-black text-stone-100 font-serif text-lg">
                      ${item.totalPrice.toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer del Carrito con Subtotal */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-900/60 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-extrabold uppercase tracking-wider text-stone-400 text-xs">Total Estimado</span>
                <span className="text-3xl font-black font-serif text-stone-100">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>

              <button 
                onClick={onOpenCheckout}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-4 rounded-xl shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer uppercase tracking-wider text-xs"
              >
                <span>Continuar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};