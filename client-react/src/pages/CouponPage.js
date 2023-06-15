import React,{useEffect,useState} from 'react'

import {getCoupon} from '../axios'

import Coupon from '../components/Coupon'
import { Typography } from '@mui/material';
const CouponPage = () => {
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
    const user = JSON.parse(tmp);
    const [hasCoupon,setHasCoupon] = useState(null);
  useEffect(()=>{
    console.log("jhjjjjjj")
    getCoupon(user._id).then((response)=>{
     
      setHasCoupon(response.data)
      console.log(hasCoupon)
    })
    

  },[]);
 
  return (
    hasCoupon && hasCoupon ? <Coupon/>:<Typography style={{fontWeight:'bold',textAlign:"center",}}>
     No Coupons Yet 
     </Typography>
  )
}

export default CouponPage