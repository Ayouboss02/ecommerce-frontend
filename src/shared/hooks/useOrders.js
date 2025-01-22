import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
} from '../../store/slices/orderSlice';
import { orderService } from '../../core/services/orderService';

export const useOrders = () => {
  const dispatch = useDispatch();
  const { orders, currentOrder, loading, error } = useSelector((state) => state.order);

  const fetchOrders = useCallback(async () => {
    try {
      dispatch(fetchOrdersStart());
      const response = await orderService.getOrders();
      dispatch(fetchOrdersSuccess(response));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
    }
  }, [dispatch]);

  const createOrder = useCallback(async (orderData) => {
    try {
      dispatch(createOrderStart());
      const response = await orderService.createOrder(orderData);
      dispatch(createOrderSuccess(response));
      return response;
    } catch (error) {
      dispatch(createOrderFailure(error.message));
      throw error;
    }
  }, [dispatch]);

  return {
    orders,
    currentOrder,
    loading,
    error,
    fetchOrders,
    createOrder,
  };
};
