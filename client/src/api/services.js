import API from './axios';

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
};

export const templateAPI = {
  getAll: (params) => API.get('/templates', { params }),
  getById: (id) => API.get(`/templates/${id}`),
};

export const favoriteAPI = {
  getAll: () => API.get('/favorites'),
  getIds: () => API.get('/favorites/ids'),
  toggle: (templateId) => API.post(`/favorites/${templateId}`),
  check: (templateId) => API.get(`/favorites/check/${templateId}`),
};
