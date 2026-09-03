import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import './styles/pizzeria-animations.css';

// Contexto y Protecciones de Admin
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Páginas del Admin
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';

export function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 1. RUTAS PÚBLICAS (Con Navbar y Footer) */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between antialiased selection:bg-red-600 selection:text-white">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/como-pedir" element={<HowItWorksPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </div>
          }
        />

        {/* 2. RUTAS DE ADMINISTRACIÓN (Pantalla completa sin Navbar/Footer del cliente) */}
        <Route path="/admin/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;