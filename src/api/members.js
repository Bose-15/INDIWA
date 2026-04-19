import { api } from './client';

export const membersApi = {
  getMe:    ()     => api.get('/api/members/me'),
  updateMe: (data) => api.put('/api/members/me', data),
};
