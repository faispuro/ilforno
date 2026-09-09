import React, { useEffect, useState } from 'react';
import { HeroEditorTab } from './HeroEditorTab';
import { heroService } from '../../services/heroService';
import { uploadImage } from '../../services/upload';

export const HeroDashboardPage = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    heroService
      .get()
      .then(setHeroData)
      .catch(() => setHeroData({}))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (_section, data) => {
    let bgImage = data.bgImage;

    // Si el usuario eligió una imagen nueva, subila primero
    if (data.bgImageFile) {
      bgImage = await uploadImage(data.bgImageFile);
    }

    const payload = {
      titleHighlight: data.titleHighlight,
      titleMain: data.titleMain,
      badgeYears: data.badgeYears,
      badgeText: data.badgeText,
      description: data.description,
      bgImage,
    };

    const updated = await heroService.update(payload);
    setHeroData({ ...updated, bgImagePreview: null, bgImageFile: null });
  };

  if (loading) {
    return <div className="p-8 text-stone-400 font-mono text-sm">Cargando...</div>;
  }

  return (
    <HeroEditorTab
      heroData={heroData}
      setHeroData={setHeroData}
      onSave={handleSave}
    />
  );
};