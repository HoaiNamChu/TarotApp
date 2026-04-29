import { create } from 'zustand';
import { bookingService } from '../services';

export const useBookingStore = create((set) => ({
  bookings: [],
  isLoading: false,
  error: null,

  getAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await bookingService.getAll();
      set({ bookings: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
    }
  },

  create: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bookingService.create(data);
      set((state) => ({
        bookings: [...state.bookings, response.data.booking],
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      throw error;
    }
  },

  update: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await bookingService.update(id, data);
      set((state) => ({
        bookings: state.bookings.map((b) => (b.id === id ? response.data.booking : b)),
        isLoading: false,
      }));
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      throw error;
    }
  },

  delete: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await bookingService.delete(id);
      set((state) => ({
        bookings: state.bookings.filter((b) => b.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
    }
  },
}));
