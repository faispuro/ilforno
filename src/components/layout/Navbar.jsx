import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Pizza, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '543410000000';
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola! Quería consultar por un pedido 🍕')}`;

export const Navbar = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand */}
        <Link
          to="/"
          onClick={handleBrandClick}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 rounded-full bg-red-600 border-2 border-dashed border-red-300/50 flex flex-col items-center justify-center transition-all duration-300 -rotate-6 group-hover:rotate-0 group-hover:border-amber-300 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.5)] shrink-0">
            <Pizza className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white leading-tight font-serif uppercase drop-shadow-md">
              Il Fondo
            </h1>
            <p className="text-[10px] font-bold text-red-500 tracking-wide drop-shadow">
              pizza a la piedra, Rosario
            </p>
          </div>
        </Link>

        {/* Links de navegación */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wide">
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

            <NavLink
              to="/como-pedir"
              onClick={handleHowToOrderClick}
              className={({ isActive }) =>
                `flex items-center gap-2 transition-colors ${
                  isActive ? 'text-stone-100' : 'text-stone-400 hover:text-stone-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100 shadow-[0_0_6px_rgba(239,68,68,0.8)]' : 'opacity-0 scale-0'
                    }`}
                  />
                  ¿Cómo pedimos?
                </>
              )}
            </NavLink>
          </nav>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold pl-4 pr-3 py-2.5 transition-all duration-150 cursor-pointer"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%)' }}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir por WhatsApp</span>
          </a>
        </div>

      </div>
    </header>
  );
};