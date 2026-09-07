import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Flame, Lock, User, AlertCircle, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas. Verificá los datos ingresados.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md relative group z-10">
      {/* Resplandor trasero fusionando Ámbar y Rojo Cálido */}
      <div className="absolute -inset-1 bg-linear-to-r from-amber-600/30 via-red-900/25 to-amber-700/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 pointer-events-none" />

      {/* Tarjeta del Formulario */}
      <div className="relative w-full p-8 md:p-10 bg-stone-900/90 border border-stone-800/90 rounded-3xl shadow-2xl backdrop-blur-md">
        
        {/* Cabecera del Formulario */}
        <div className="text-center space-y-3 mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-stone-950 border border-amber-900/50 shadow-inner flex items-center justify-center text-amber-500">
              <Flame className="w-7 h-7 text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.6)] animate-pulse" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-stone-900 rounded-full flex items-center justify-center" title="Sistema Activo">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black uppercase tracking-widest text-stone-100 font-serif">
              Acceso Admin
            </h1>
            <p className="text-stone-400 text-[11px] font-mono uppercase tracking-[0.25em] mt-1">
              IL FONDO · PIZZERÍA ARTESANAL
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="h-px bg-linear-to-r from-transparent via-stone-800 to-transparent w-full" />
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
            <div className="h-px bg-linear-to-r from-transparent via-stone-800 to-transparent w-full" />
          </div>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-950/60 border border-red-800/80 rounded-xl flex items-start gap-3 text-red-300 text-xs font-mono animate-fade-in shadow-lg shadow-red-950/40">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Campos de Entrada */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email / Usuario */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider">
              Usuario / Email
            </label>
            <div className="relative group/input">
              <User className="w-4 h-4 text-stone-500 group-focus-within/input:text-amber-500 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ilfondo.com"
                className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-10 pr-4 py-3.5 text-stone-100 text-sm focus:outline-none focus:border-amber-600/80 focus:ring-2 focus:ring-amber-600/20 transition-all font-mono placeholder:text-stone-600 shadow-inner"
              />
            </div>
          </div>

          {/* Contraseña con Toggle de visibilidad */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                Contraseña
              </label>
            </div>
            <div className="relative group/input">
              <Lock className="w-4 h-4 text-stone-500 group-focus-within/input:text-amber-500 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-stone-950/80 border border-stone-800 rounded-xl pl-10 pr-11 py-3.5 text-stone-100 text-sm focus:outline-none focus:border-amber-600/80 focus:ring-2 focus:ring-amber-600/20 transition-all font-mono placeholder:text-stone-600 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors focus:outline-none p-1 rounded-md cursor-pointer"
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Botón Submit en fuego (Ámbar a Rojo) */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 active:from-amber-700 active:to-red-700 disabled:opacity-50 text-white font-black text-xs uppercase tracking-[0.2em] py-4 rounded-xl shadow-lg shadow-amber-950/40 transition-all duration-200 hover:shadow-amber-600/20 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>VERIFICANDO SESIÓN...</span>
              </>
            ) : (
              <span>INGRESAR AL PANEL</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};