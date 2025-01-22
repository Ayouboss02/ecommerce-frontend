import api from './api';

export const basketService = {
  async getBasket() {
    const response = await api.get('/basket');
    return response.data;
  },

  async addItem(productId, quantity = 1) {
    const response = await api.post('/basket/items', { productId, quantity });
    return response.data;
  },

  async removeItem(productId) {
    const response = await api.delete(`/basket/items/${productId}`);
    return response.data;
  },

  async updateQuantity(productId, quantity) {
    const response = await api.put(`/basket/items/${productId}`, { quantity });
    return response.data;
  },

  async clearBasket() {
    const response = await api.delete('/basket');
    return response.data;
  },
};
