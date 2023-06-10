import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:3001/'}); 

export const fetchProduct =async (userId, id) => await API.post(`/product/${id}`,{ userId });
export const reviewProd = async (value, id) => await API.post(`/product/${id}/rev`,{ value });
export const favouriteProduct = async(userId, id) =>await API.put(`/product/${id}/fav`,{ userId });
export const alertProduct =async (userId,id) => await API.put(`/product/${id}/alert`,{ userId });


export const getUserReviews = async (id) => await API.get(`/user/${id}/reviews`) ;
export const getWishList = async(id) => await API.get(`/user/${id}/wish`);
export const deleteWishListItem = async (productId,id)=> await API.put(`/user/${id}/wish`,{ productId });
export const delNotification = async (id) => await API.delete(`/user/${id}`);
export const getUserNotifications = async(id) => await API.get(`/user/${id}/not`);
export const getCoupon = async (id) => await API.get(`/user/${id}/coupon`);