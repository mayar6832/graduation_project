import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4000/'}); 

export const fetchProduct = (id) => API.get(`/products/${id}`);
export const review = (value, id) => API.post(`/products/${id}/rev`,{ value });
export const favouriteProduct = (id) => API.put(`/products/${id}/fav`);
export const alertProduct = (id) => API.put(`/products/${id}/alert`);