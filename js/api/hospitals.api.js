import{apiRequest}from'./client.js';export const listHospitals=(p={})=>apiRequest(`/hospitals?${new URLSearchParams(p)}`);export const getHospital=id=>apiRequest(`/hospitals/${id}`);
