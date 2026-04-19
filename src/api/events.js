import { api } from './client';

export const eventsApi = {
  list:    (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/api/events${qs ? `?${qs}` : ''}`);
  },
  getById: (id)    => api.get(`/api/events/${id}`),
  create:  (data)  => api.post('/api/events', data),
  update:  (id, data) => api.put(`/api/events/${id}`, data),
  publish: (id)    => api.patch(`/api/events/${id}/publish`, {}),
  delete:  (id)    => api.delete(`/api/events/${id}`),
};
