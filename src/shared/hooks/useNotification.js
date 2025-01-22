import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { showNotification, hideNotification } from '../../store/slices/uiSlice';

export const useNotification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const notify = useCallback((message, type = 'info') => {
    dispatch(showNotification({ message, type }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 3000);
  }, [dispatch]);

  const clearNotification = useCallback(() => {
    dispatch(hideNotification());
  }, [dispatch]);

  return {
    notification,
    notify,
    clearNotification,
  };
};
