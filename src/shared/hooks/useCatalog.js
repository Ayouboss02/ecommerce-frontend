import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedProduct,
  setFilters,
} from '../../store/slices/catalogSlice';
import { catalogService } from '../../core/services/catalogService';

export const useCatalog = () => {
  const dispatch = useDispatch();
  const { products, selectedProduct, filters, loading, error } = useSelector(
    (state) => state.catalog
  );

  const fetchProducts = useCallback(async () => {
    try {
      dispatch(fetchProductsStart());
      const response = await catalogService.getProducts(filters);
      dispatch(fetchProductsSuccess(response));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  }, [dispatch, filters]);

  const selectProduct = useCallback((product) => {
    dispatch(setSelectedProduct(product));
  }, [dispatch]);

  const updateFilters = useCallback((newFilters) => {
    dispatch(setFilters(newFilters));
  }, [dispatch]);

  return {
    products,
    selectedProduct,
    filters,
    loading,
    error,
    fetchProducts,
    selectProduct,
    updateFilters,
  };
};
