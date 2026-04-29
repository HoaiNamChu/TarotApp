import api from './api';

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
};

export const bookingService = {
  getAll: () => api.get('/bookings'),
  get: (id) => api.get(`/bookings/${id}`),
  create: (data) => api.post('/bookings', data),
  update: (id, data) => api.put(`/bookings/${id}`, data),
  delete: (id) => api.delete(`/bookings/${id}`),
  getPayment: (bookingId) => api.get(`/bookings/${bookingId}/payment`),
};

export const tarotService = {
  getDemo: () => api.post('/tarot/demo'),
  getReading: (bookingId) => api.get(`/tarot/readings/${bookingId}`),
  createReading: (data) => api.post('/tarot/readings', data),
};

export const paymentService = {
  get: (paymentId) => api.get(`/payments/${paymentId}`),
  create: (data) => api.post('/payments', data),
  getByBooking: (bookingId) => api.get(`/bookings/${bookingId}/payment`),
};
