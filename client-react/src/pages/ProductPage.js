
import Product from '../components/product/Product'
import React ,{ useEffect,useState } from "react";

import {fetchProduct } from '../axios'
import { useParams } from 'react-router-dom';
function ProductPage() {
  const { id }  = useParams();
  const [productBack,setProductBack] = useState(null);
  const [recommendationsBack,setrecommendations] = useState(null);
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
  const user = JSON.parse(tmp);
  const userId = user._id;

  useEffect(()=>{ 
  // console.log(userId);
    fetchProduct(userId ,id).then((response) => {
    setrecommendations(response.data.recommended)
    setProductBack(response.data.data);
    
  });
   
  },[userId,id]);
 
  // console.log(productBack)
  return (

    productBack &&  <Product product={productBack} recomendations={recommendationsBack} />
   
  )
}

export default ProductPage