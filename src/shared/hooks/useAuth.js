import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';
import { authService } from '../../core/services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = useCallback(async (credentials) => {
    try {
      dispatch(loginStart());
      const response = await authService.login(credentials);
      dispatch(loginSuccess(response));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }, [dispatch]);

  const register = useCallback(async (userData) => {
    try {
      dispatch(loginStart());
      const response = await authService.register(userData);
      dispatch(loginSuccess(response));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  }, [dispatch]);

  const logoutUser = useCallback(() => {
    authService.logout();
    dispatch(logout());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
  };
};
