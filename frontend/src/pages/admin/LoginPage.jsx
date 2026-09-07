import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame } from 'lucide-react';
import { LoginForm } from '../../components/auth/LoginForm';
import { Embers } from '../../components/common/Embers';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop')`,
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-red-950/30 via-amber-950/15 to-stone-950 pointer-events-none" />

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-125 h-32 bg-amber-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-150 h-40 bg-red-900/15 blur-[120px] pointer-events-none rounded-full" />

      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-stone-400 hover:text-stone-100 transition-all text-xs font-mono uppercase tracking-wider group bg-stone-900/70 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-600/40 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg shadow-black/40 hover:scale-[1.02] active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 text-amber-500 transition-transform group-hover:-translate-x-1" />
        <span className="font-semibold">Volver a la Web</span>
      </Link>

      <Embers
        bottom="bottom-0"
        embers={[
          { left: '10%', size: 4, delay: '0s', duration: '5s' },
          { left: '25%', size: 3, delay: '1.5s', duration: '7s' },
          { left: '50%', size: 5, delay: '0.5s', duration: '6s' },
          { left: '75%', size: 3, delay: '2s', duration: '8s' },
          { left: '90%', size: 4, delay: '1s', duration: '6.5s' },
        ]}
      />

      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>

      <footer className="absolute bottom-5 text-center text-[10px] font-mono text-stone-500 uppercase tracking-widest z-10 pointer-events-none flex items-center gap-1.5">
        <Flame className="w-3 h-3 text-amber-600/70 inline-block" />
        <span>Il Fondo © {new Date().getFullYear()} — Acceso Restringido</span>
      </footer>
    </div>
  );
};