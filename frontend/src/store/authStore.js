import { create } from 'zustand';
import { authService } from '../services';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.register(data);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      throw error;
    }
  },

  login: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.login(data);
      localStorage.setItem('auth_token', response.data.token);
      set({ user: response.data.user, token: response.data.token, isLoading: false });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('auth_token');
    set({ user: null, token: null });
  },

  getMe: async () => {
    try {
      const response = await authService.getMe();
      set({ user: response.data });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
}));
