import { api } from './client';

export const authApi = {
  register: (data) => api.post('/api/auth/register', data),
  login:    (mobile, password) => api.post('/api/auth/login', { mobile, password }),
  refresh:  (refreshToken) => api.post('/api/auth/refresh', { refreshToken }),
  logout:   (refreshToken) => api.post('/api/auth/logout', { refreshToken }),
  me:       () => api.get('/api/auth/me'),
  forgotPassword: (mobile) => api.post('/api/auth/forgot-password', { mobile }),
  resetPassword:  (data)   => api.post('/api/auth/reset-password', data),
  changePassword: (data)   => api.put('/api/auth/change-password', data),
};
