import * as api from '../api';
//action creators
export const getProduct = (id) => async (dispatch) => {


    try {
        const { data } = await api.fetchProduct(id);
        
        dispatch({type:'FETCH_ONE', payload: data})
    } catch (error) {

        console.log('HERE '+error.message);
    }
    // const action = {
    //     type:'FETCH_ONE',payload:[]
    // }
//     dispatch (action);
 }
 export const RevProduct = (value, id)=> async(dispatch) => {
    // const user = JSON.parse(localStorage.getItem('profile'));
    try {
        const { data } = await api.review(value,id);
        console.log("heree is the rivew ===> "+data);
        dispatch({type:'REV', payload: data})
        console.log(data.reviews);
        return data.reviews;
    } catch (error) {

        console.log('HERE '+error.message);
    }
   
 }
 export const FavProduct = (id)=> async(dispatch) => {
    // const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.favouriteProduct(id);

        dispatch({type:'FAV', payload: data})
        return data.favourite;
    } catch (error) {

        console.log('HERE '+error.message);
    }
  
 }
 export const alertProduct = (id)=> async(dispatch) => {
    // const user = JSON.parse(localStorage.getItem('profile'))

    try {
        const { data } = await api.alertProduct(id);

        dispatch({type:'ALERT', payload: data})
        return data.alert;
    } catch (error) {

        console.log('HERE '+error.message);
    }
   
 }
