import { apiRequest, toJsonBody } from './client.js';

export const getMyProfile = () => apiRequest('/users/me');
export const updateMyProfile = (payload) => apiRequest('/users/me', { method: 'PATCH', body: toJsonBody(payload) });
