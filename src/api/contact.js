import { api } from './client';

export const contactApi = {
  submit: (data) => api.post('/api/contact', data),
};
