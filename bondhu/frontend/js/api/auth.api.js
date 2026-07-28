import { apiRequest, toJsonBody } from './client.js';

export const login = (payload) => apiRequest('/auth/login', { method: 'POST', body: toJsonBody(payload) });
export const register = (payload) => apiRequest('/auth/register', { method: 'POST', body: toJsonBody(payload) });
export const requestOtp = (payload) => apiRequest('/auth/otp/request', { method: 'POST', body: toJsonBody(payload) });
export const verifyOtp = (payload) => apiRequest('/auth/otp/verify', { method: 'POST', body: toJsonBody(payload) });
export const getMe = () => apiRequest('/auth/me');
