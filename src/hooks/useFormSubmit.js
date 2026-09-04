// src/hooks/useFormSubmit.js
import { useState } from 'react';

export const useFormSubmit = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  /**
   * Ejecuta una función asíncrona de guardado manejando estados y mensajes.
   * @param {Function} asyncAction - La promesa / petición que guarda los datos.
   * @param {Object} options - Mensajes personalizados.
   * @param {string} options.successMessage - Mensaje si sale todo bien.
   * @param {string} options.errorMessage - Mensaje si falla.
   */
  const submitWithToast = async (asyncAction, { successMessage = 'Guardado con éxito', errorMessage = 'Ocurrió un error al guardar' } = {}) => {
    setIsSaving(true);
    setToast(null);

    try {
      await asyncAction();
      setToast({ type: 'success', message: successMessage });
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: errorMessage });
    } finally {
      setIsSaving(false);
      // Auto-ocultar toast después de 4.5 segundos
      setTimeout(() => setToast(null), 4500);
    }
  };

  return {
    isSaving,
    toast,
    setToast,
    submitWithToast,
  };
};