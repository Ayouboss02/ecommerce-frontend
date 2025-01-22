import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../../store/slices/cartSlice';

export const useBasket = () => {
  const dispatch = useDispatch();
  const { items, total, loading, error } = useSelector((state) => state.cart);

  const addItem = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  const removeItem = useCallback((productId) => {
    dispatch(removeFromCart(productId));
  }, [dispatch]);

  const updateItemQuantity = useCallback((productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  }, [dispatch]);

  const emptyBasket = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    total,
    loading,
    error,
    addItem,
    removeItem,
    updateItemQuantity,
    emptyBasket,
  };
};
