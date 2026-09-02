import React, { useState } from 'react';
import { X, Send, MapPin, Store, CreditCard, Banknote } from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, cart, clearCart }) => {
  if (!isOpen) return null;

  const [deliveryType, setDeliveryType] = useState('delivery'); 
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '', notes: '' });

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleSendOrder = (e) => {
    e.preventDefault();
    
    // Armar texto con formato para WhatsApp
    let message = `🍕 *NUEVO PEDIDO - IL FONDO*\n\n`;
    message += `👤 *Cliente:* ${customerInfo.name}\n`;
    message += `📞 *Teléfono:* ${customerInfo.phone}\n`;
    message += `🛵 *Tipo:* ${deliveryType === 'delivery' ? 'Envío a Domicilio' : 'Retiro en Local'}\n`;
    if (deliveryType === 'delivery') message += `📍 *Dirección:* ${customerInfo.address}\n`;
    message += `💳 *Pago:* ${paymentMethod.toUpperCase()}\n\n`;
    message += `📋 *DETALLE DEL PEDIDO:*\n`;

    cart.forEach((item, i) => {
      message += `${i + 1}. *${item.quantity}x ${item.pizza.name}* ($${item.totalPrice.toLocaleString('es-AR')})\n`;
      if (item.selectedToppings && item.selectedToppings.length > 0) {
        message += `   • Extras: ${item.selectedToppings.map(t => t.name).join(', ')}\n`;
      }
      if (item.notes) message += `   • Aclaración: ${item.notes}\n`;
    });

    message += `\n💰 *TOTAL A PAGAR:* $${total.toLocaleString('es-AR')}`;

    const phoneNumber = "5493410000000"; 
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-gray-950 text-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-800/80 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800/80 pb-4">
          <div>
            <h3 className="text-2xl font-black font-serif uppercase tracking-tight text-white">Finalizar Pedido</h3>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
              IL FONDO • TRATTORIA
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors border border-gray-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSendOrder} className="space-y-5">
          
          {/* Tipo de Entrega */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Modalidad de Entrega
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  deliveryType === 'delivery' 
                    ? 'border-red-600 bg-red-600/10 text-red-500 shadow-lg shadow-red-600/10' 
                    : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                <MapPin className="w-4 h-4" /> Domicilio
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('takeaway')}
                className={`p-3.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  deliveryType === 'takeaway' 
                    ? 'border-red-600 bg-red-600/10 text-red-500 shadow-lg shadow-red-600/10' 
                    : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" /> Retiro Local
              </button>
            </div>
          </div>

          {/* Datos Personales */}
          <div className="space-y-3">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Tus Datos
            </label>
            <input
              type="text"
              required
              placeholder="Nombre y Apellido"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              className="w-full p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            <input
              type="tel"
              required
              placeholder="Teléfono de contacto"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              className="w-full p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
            />
            {deliveryType === 'delivery' && (
              <input
                type="text"
                required
                placeholder="Dirección completa (Calle, número, depto)"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                className="w-full p-3.5 rounded-2xl bg-gray-900 border border-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition-colors"
              />
            )}
          </div>

          {/* Método de Pago */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Forma de Pago
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('efectivo')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  paymentMethod === 'efectivo' 
                    ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20' 
                    : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                <Banknote className="w-4 h-4" /> Efectivo
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('transferencia')}
                className={`p-3 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  paymentMethod === 'transferencia' 
                    ? 'border-red-600 bg-red-600 text-white shadow-md shadow-red-600/20' 
                    : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-700 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Transferencia
              </button>
            </div>
          </div>

          {/* Confirmación y Total */}
          <div className="pt-5 border-t border-gray-800/80 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block">Total a Enviar</span>
              <span className="text-2xl sm:text-3xl font-black font-serif text-white">
                ${total.toLocaleString('es-AR')}
              </span>
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" /> Enviar Pedido
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};