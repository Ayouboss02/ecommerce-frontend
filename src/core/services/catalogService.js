import api from './api';

export const catalogService = {
  async getProducts(filters = {}) {
    const response = await api.get('/catalog/products', { params: filters });
    return response.data;
  },

  async getProduct(id) {
    const response = await api.get(`/catalog/products/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/catalog/categories');
    return response.data;
  },
};
