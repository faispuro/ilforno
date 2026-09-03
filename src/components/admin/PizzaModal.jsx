import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Save, AlertCircle, Loader2, UtensilsCrossed } from 'lucide-react';

const DOUGH_EASE = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const STYLE = `
  @keyframes modalIn {
    0% { opacity: 0; transform: translateY(16px) scale(0.97); filter: blur(4px); }
    100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
  }
  @keyframes overlayIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-6px); }
    40% { transform: translateX(6px); }
    60% { transform: translateX(-4px); }
    80% { transform: translateX(4px); }
  }
  @keyframes fieldErrorIn {
    0% { opacity: 0; transform: translateY(-4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .modal-in { animation: modalIn 350ms ${DOUGH_EASE} both; }
  .overlay-in { animation: overlayIn 200ms ease-out both; }
  .modal-shake { animation: shake 450ms ease-in-out; }
  .field-error-in { animation: fieldErrorIn 220ms ease-out both; }
`;

const EMPTY_FORM = {
  name: '',
  price: '',
  tagBadge: 'RECOMENDADA',
  description: '',
  orderNumber: '',
  available: true,
  previewImage: '',
  imageFile: null,
};

export const PizzaModal = ({ isOpen, onClose, onSave, pizzaToEdit, existingPizzas = [] }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeKey, setShakeKey] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    if (pizzaToEdit) {
      setFormData({
        ...pizzaToEdit,
        price: pizzaToEdit.price ? pizzaToEdit.price.toString() : '',
        previewImage: pizzaToEdit.previewImage || pizzaToEdit.image || '',
        imageFile: pizzaToEdit.imageFile || null,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
    setTouched({});
    setSaving(false);
  }, [pizzaToEdit, isOpen]);

  if (!isOpen) return null;

  const otherPizzas = existingPizzas.filter((p) => !pizzaToEdit || p.id !== pizzaToEdit.id);

  const validate = (data) => {
    const errs = {};

    if (!data.orderNumber?.toString().trim()) {
      errs.orderNumber = 'El número de orden es obligatorio.';
    } else if (otherPizzas.some((p) => String(p.orderNumber).trim() === String(data.orderNumber).trim())) {
      errs.orderNumber = `Ya existe la posición #${data.orderNumber}.`;
    }

    if (!data.name?.trim()) {
      errs.name = 'El nombre es obligatorio.';
    } else if (otherPizzas.some((p) => p.name.trim().toLowerCase() === data.name.trim().toLowerCase())) {
      errs.name = 'Ya existe una pizza con ese nombre.';
    }

    const priceNum = Number(data.price);
    if (!data.price?.toString().trim()) {
      errs.price = 'El precio es obligatorio.';
    } else if (isNaN(priceNum) || priceNum <= 0) {
      errs.price = 'Ingresá un precio válido.';
    }

    if (!data.description?.trim()) {
      errs.description = 'Agregá los ingredientes.';
    } else if (data.description.trim().length < 10) {
      errs.description = 'Mínimo 10 caracteres.';
    }

    if (!data.previewImage) {
      errs.image = 'La imagen es obligatoria.';
    }

    return errs;
  };

  const revalidateLive = (nextData) => {
    const allErrors = validate(nextData);
    setErrors((prev) => {
      const updated = { ...prev };
      Object.keys(touched).forEach((key) => {
        if (touched[key]) updated[key] = allErrors[key];
      });
      return updated;
    });
    return allErrors;
  };

  const updateField = (field, value) => {
    const next = { ...formData, [field]: value };
    setFormData(next);
    if (touched[field]) revalidateLive(next);
  };

  const markTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validate(formData) }));
  };

  const handleImageChange = (file) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    const next = { ...formData, previewImage: previewUrl, imageFile: file };
    setFormData(next);
    setTouched((prev) => ({ ...prev, image: true }));
    if (touched.image || errors.image) {
      setErrors((prev) => ({ ...prev, image: validate(next).image }));
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const allErrors = validate(formData);
    setErrors(allErrors);
    setTouched({
      orderNumber: true,
      name: true,
      price: true,
      description: true,
      image: true,
    });

    if (Object.keys(allErrors).length > 0) {
      setShakeKey((k) => k + 1);
      return;
    }

    setSaving(true);
    setTimeout(() => {
      onSave({
        ...formData,
        price: Number(formData.price) || 0,
        image: formData.previewImage || formData.image,
      });
      setSaving(false);
      onClose();
    }, 400);
  };

  const fieldClass = (field, base = '') =>
    `w-full bg-stone-950/80 border rounded-2xl px-3.5 py-2.5 text-xs font-mono text-stone-100 placeholder-stone-600 focus:outline-none transition-all ${base} ${
      errors[field]
        ? 'border-red-800/80 focus:border-red-500 bg-red-950/10'
        : 'border-stone-800/90 focus:border-amber-500/80 focus:bg-stone-950'
    }`;

  const FieldError = ({ field }) =>
    errors[field] ? (
      <p className="field-error-in flex items-center gap-1.5 text-[10px] font-mono text-red-400 mt-1.5">
        <AlertCircle className="w-3 h-3 shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="overlay-in fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <style>{STYLE}</style>

      <div
        key={shakeKey}
        className={`modal-in relative bg-stone-900/95 border border-stone-800/90 rounded-3xl w-full max-w-lg shadow-2xl shadow-black/80 text-stone-100 flex flex-col max-h-[90vh] my-auto overflow-hidden ${
          shakeKey > 0 ? 'modal-shake' : ''
        }`}
      >
        {/* Glow de fondo amber en el modal */}
        <div className="absolute top-0 right-0 w-48 h-24 bg-amber-600/10 blur-2xl pointer-events-none rounded-full" />

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-stone-800/80 p-5 sm:p-6 bg-stone-900/80 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold flex items-center gap-1.5 bg-amber-950/50 border border-amber-900/50 px-2.5 py-0.5 rounded-full w-fit">
              <UtensilsCrossed className="w-3 h-3" />
              {pizzaToEdit ? 'Modificar Producto' : 'Nuevo Producto'}
            </span>
            <h3 className="font-serif font-black text-xl tracking-tight text-stone-100">
              {pizzaToEdit ? `Editar ${pizzaToEdit.name}` : 'Agregar Pizza al Menú'}
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-2 text-stone-400 hover:text-stone-100 bg-stone-950 hover:bg-stone-800 rounded-xl border border-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cuerpo del formulario */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Posición / Orden <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                value={formData.orderNumber}
                onChange={(e) => updateField('orderNumber', e.target.value)}
                onBlur={() => markTouched('orderNumber')}
                placeholder="01"
                className={fieldClass('orderNumber')}
              />
              <FieldError field="orderNumber" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Etiqueta Badge
              </label>
              <input
                type="text"
                value={formData.tagBadge}
                onChange={(e) => updateField('tagBadge', e.target.value)}
                placeholder="RECOMENDADA"
                className={fieldClass('tagBadge')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Nombre de la Pizza <span className="text-amber-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                onBlur={() => markTouched('name')}
                placeholder="Fugazzeta Especial"
                className={fieldClass('name')}
              />
              <FieldError field="name" />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Precio ($) <span className="text-amber-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => updateField('price', e.target.value)}
                onBlur={() => markTouched('price')}
                placeholder="10500"
                className={fieldClass('price')}
              />
              <FieldError field="price" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                Ingredientes y Descripción <span className="text-amber-500">*</span>
              </label>
              <span className="text-[9px] font-mono text-stone-500">{formData.description.length}/200</span>
            </div>
            <textarea
              rows="3"
              maxLength={200}
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              onBlur={() => markTouched('description')}
              placeholder="Salsa de tomate casera, muzzarella, cebolla caramelizada y orégano..."
              className={fieldClass('description', 'resize-none')}
            />
            <FieldError field="description" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider font-semibold block">
              Fotografía <span className="text-amber-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-center shrink-0 overflow-hidden relative group">
                {formData.previewImage ? (
                  <img src={formData.previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-stone-600" />
                )}
              </div>

              <label
                className={`flex-1 hover:bg-stone-800/50 text-stone-300 border rounded-2xl p-3 text-xs font-mono cursor-pointer transition-all flex items-center justify-center gap-2 ${
                  errors.image ? 'bg-red-950/20 border-red-800' : 'bg-stone-950/80 border-stone-800'
                }`}
              >
                <Upload className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="truncate">
                  {formData.imageFile ? formData.imageFile.name : 'Subir imagen desde equipo'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e.target.files[0])}
                />
              </label>
            </div>
            <FieldError field="image" />
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-stone-800/80 p-5 sm:p-6 bg-stone-900/80 flex justify-end gap-3 relative z-10">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="px-4 py-2.5 bg-stone-950 hover:bg-stone-800 text-stone-300 text-xs font-mono rounded-xl border border-stone-800 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 bg-stone-100 hover:bg-white text-stone-950 text-xs font-mono font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-stone-950" /> Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-stone-950" /> 
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};