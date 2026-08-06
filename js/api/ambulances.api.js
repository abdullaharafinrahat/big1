import{apiRequest}from'./client.js';export const listAmbulances=(p={})=>apiRequest(`/ambulances?${new URLSearchParams(p)}`);
