import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';

export function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col justify-between antialiased selection:bg-red-600 selection:text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/como-pedir" element={<HowItWorksPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;