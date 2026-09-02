import React, { useState } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';

export const PizzaCustomizerModal = ({ pizza, onClose, onAddToCart }) => {
  if (!pizza) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleTopping = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = pizza.price + toppingsTotal;
  const totalPrice = unitPrice * (quantity || 1);

  const handleConfirm = () => {
    onAddToCart({
      pizza,
      quantity: quantity || 1,
      selectedToppings,
      notes,
      unitPrice,
      totalPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-950 text-stone-100 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-stone-800/80">
        
        {/* Header con Imagen */}
        <div className="relative h-52 bg-linear-to-b from-stone-900 via-stone-950 to-stone-950 flex items-center justify-center p-6 border-b border-stone-800/50 overflow-hidden">
          <div className="absolute w-48 h-48 rounded-full bg-red-900/20 blur-3xl pointer-events-none" />

          <img 
            src={pizza.image} 
            alt={pizza.name} 
            className="h-full object-contain relative z-10 drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-500" 
          />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-stone-950/80 hover:bg-stone-900 text-stone-400 hover:text-stone-100 p-2 rounded-xl border border-stone-800 transition-all cursor-pointer backdrop-blur-sm"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 scrollbar-thin scrollbar-thumb-stone-800">
          <div>
            <h2 className="text-2xl font-black font-serif uppercase tracking-tight text-stone-100">
              {pizza.name}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 leading-relaxed">
              {pizza.description}
            </p>
          </div>

          {/* Adicionales */}
          {pizza.availableToppings?.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-stone-400 text-[11px] uppercase tracking-widest">
                Agregar Adicionales
              </h3>
              <div className="space-y-2">
                {pizza.availableToppings.map((topping) => {
                  const isSelected = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <button
                      key={topping.id}
                      onClick={() => toggleTopping(topping)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-red-600/80 bg-red-950/30 text-stone-100 font-medium shadow-lg shadow-red-950/20' 
                          : 'border-stone-800/80 bg-stone-900/50 hover:border-stone-700 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-red-600 border-red-600 text-white' : 'border-stone-700 bg-stone-950'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-3" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold">{topping.name}</span>
                      </div>
                      <span className="text-xs font-black text-red-500 font-serif">
                        +${topping.price.toLocaleString('es-AR')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Aclaraciones */}
          <div>
            <label htmlFor="notes" className="block font-extrabold text-stone-400 text-[11px] uppercase tracking-widest mb-2">
              Aclaraciones especiales
            </label>
            <textarea
              id="notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Masa bien crocante, sin aceitunas..."
              className="w-full rounded-2xl bg-stone-900/60 border border-stone-800/80 p-3.5 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-red-600/80 resize-none transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-stone-800/80 bg-stone-900/40 flex items-center justify-between gap-4">
          
          {/* Contador manual*/}
          <div className="flex items-center gap-1 bg-stone-950 border border-stone-800 rounded-xl p-1.5">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 disabled:opacity-30 transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 text-center bg-transparent font-black text-stone-100 text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black py-3.5 px-5 rounded-xl shadow-lg shadow-red-600/30 flex items-center justify-between transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
          >
            <span>Agregar al pedido</span>
            <span className="font-serif text-sm tracking-tight">${totalPrice.toLocaleString('es-AR')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};