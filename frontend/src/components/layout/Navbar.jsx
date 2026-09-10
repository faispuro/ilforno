import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Pizza, MessageCircle, Flame } from 'lucide-react';
import { trackEvent } from '../../services/analyticsService';
import { useLandingContent } from '../../context/LandingContext';

export const Navbar = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const { whatsapp } = useLandingContent();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const phone = (whatsapp || '+54 9 341 555-0199').replace(/\D/g, '');
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent('Hola! Quería consultar por un pedido.')}`;

  // Handler para trackear el clic antes de ir a WhatsApp
  const handleWhatsappClick = () => {
    trackEvent('WHATSAPP_CLICK');
  };

  // Escucha si la sección #menu está actualmente visible en pantalla
  useEffect(() => {
    if (pathname !== '/') {
      setIsMenuVisible(false);
      return;
    }

    const menuElement = document.getElementById('menu');
    if (!menuElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMenuVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(menuElement);

    return () => observer.disconnect();
  }, [pathname]);

  // Maneja el scroll según la ruta o el hash activo
  useEffect(() => {
    if (pathname === '/como-pedir') {
      window.scrollTo(0, 0);
    } else if (pathname === '/' && hash === '#menu') {
      const element = document.getElementById('menu');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (pathname === '/' && !hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  const handleMenuClick = (e) => {
    e.preventDefault();
    if (pathname === '/') {
      const element = document.getElementById('menu');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#menu');
    }
  };

  const handleBrandClick = (e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.history.pushState('', document.title, window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleHowToOrderClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-stone-950/90 via-stone-950/60 to-transparent backdrop-blur-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-0 h-auto sm:h-20 flex flex-nowrap items-center justify-between gap-2 sm:gap-4">

        {/* Brand */}
        <Link
          to="/"
          onClick={handleBrandClick}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 shrink-0"
        >
          <div className="relative w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-red-600 border-2 border-dashed border-red-300/50 flex flex-col items-center justify-center transition-all duration-300 -rotate-6 group-hover:rotate-0 group-hover:border-amber-300 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.5)] shrink-0">
            <Pizza className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h1 className="text-sm sm:text-lg font-black tracking-tight text-white leading-tight font-serif uppercase drop-shadow-md whitespace-nowrap">
            Il Forno
          </h1>
        </Link>

        {/* Links de navegación */}
        <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide mr-3">
            <a
              href="/#menu"
              onClick={handleMenuClick}
              className={`flex items-center gap-2 transition-colors cursor-pointer ${
                isMenuVisible
                  ? 'text-stone-100'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 transition-all duration-300 ${
                  isMenuVisible ? 'opacity-100 scale-100 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'opacity-0 scale-0'
                }`}
              />
              Nuestra carta
            </a>
          </nav>

          {/* Botón "Cómo pedimos" */}
          <NavLink
            to="/como-pedir"
            onClick={handleHowToOrderClick}
            className={({ isActive }) =>
              `group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-widest transition-all active:scale-95 overflow-hidden shrink-0 ${
                isActive
                  ? 'bg-amber-600 text-stone-950 border border-amber-500'
                  : 'bg-stone-900/80 text-amber-500 border border-dashed border-amber-700/60 hover:border-amber-500 hover:bg-stone-900'
              }`
            }
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            {({ isActive }) => (
              <>
                <Flame
                  className={`w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-stone-950' : 'text-amber-500'
                  }`}
                />
                <span className="hidden xs:inline sm:inline whitespace-nowrap">¿Cómo pedir?</span>
              </>
            )}
          </NavLink>

          {/* Botón WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="relative flex items-center gap-1.5 sm:gap-2 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white text-[10px] sm:text-xs font-bold pl-2.5 pr-2 sm:pl-4 sm:pr-3 py-2 sm:py-2.5 transition-all duration-150 cursor-pointer shrink-0"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="leading-none whitespace-nowrap">WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
};