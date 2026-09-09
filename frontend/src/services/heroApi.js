import API from './api';

const normalizeHero = (hero) => ({
  titleHighlight: hero?.titleHighlight ?? '',
  titleMain: hero?.titleMain ?? '',
  badgeYears: hero?.badgeYears ?? '',
  badgeText: hero?.badgeText ?? '',
  description: hero?.description ?? '',
  bgImage: hero?.bgImage ?? '',
});

export const heroService = {
  async get() {
    const response = await API.get('/landing/hero');
    return normalizeHero(response?.data);
  },

  async update(payload) {
    const response = await API.put('/landing/hero', payload);
    return normalizeHero(response?.data);
  },
};