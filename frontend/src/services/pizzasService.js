import API from './api';

const isBlobUrl = (value) => typeof value === 'string' && value.startsWith('blob:');

const normalizePizza = (pizza) => ({
  ...pizza,
  id: pizza?.id,
  orderNumber: Number(pizza?.orderNumber ?? 0),
  price: Number(pizza?.price ?? 0),
  available: pizza?.available ?? true,
  previewImage: isBlobUrl(pizza?.previewImage) ? '' : (pizza?.previewImage || pizza?.image || ''),
  image: isBlobUrl(pizza?.image) ? '' : (pizza?.image || ''),
});

export const pizzaService = {
  async getAll() {
    const response = await API.get('/pizzas');
    return (response?.data || []).map(normalizePizza);
  },

  async getById(id) {
    const response = await API.get(`/pizzas/${id}`);
    return normalizePizza(response?.data);
  },

  async create(payload) {
    const response = await API.post('/pizzas', payload);
    return normalizePizza(response?.data);
  },

  async update(id, payload) {
    const response = await API.put(`/pizzas/${id}`, payload);
    return normalizePizza(response?.data);
  },

  async remove(id) {
    await API.delete(`/pizzas/${id}`);
  },
};
