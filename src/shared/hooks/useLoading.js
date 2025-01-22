import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setLoading } from '../../store/slices/uiSlice';

export const useLoading = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);

  const showLoading = useCallback(() => {
    dispatch(setLoading(true));
  }, [dispatch]);

  const hideLoading = useCallback(() => {
    dispatch(setLoading(false));
  }, [dispatch]);

  return {
    loading,
    showLoading,
    hideLoading,
  };
};
