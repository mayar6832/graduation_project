import Grid from "@mui/material/Grid";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

// import { useRef } from 'react';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import PriceChart from "./PriceChart";
import RecomendationSystem from "./RecomendationSystem";
import ReviewSection from "./Review";
import { FavProduct,alertProduct } from "../actions/product";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [fav,setFav] = useState(product?.favourite);

  const [alert,setAlert] = useState(product?.alert);
  const toggleFav = ()=>{
   const newfav =  dispatch(FavProduct(product._id));
   setFav(newfav);
    
   }

   const toggleAlert = ()=>{
    const newAlert =  dispatch(alertProduct(product._id));
    setAlert(newAlert);
   }
  // const url = window.location.href;
  
  // console.log(url)
  return (
    //parent grid container
    <Grid
      container
      className="con"
      rowSpacing={0}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ mt: 2 }}
    >
      
      {/* product image column */}
      <Grid item height={350} xs={10} md={3}>
        <img
      
          className="image"
          alt="sss"
          src={product.image}
        ></img>
      </Grid>
      {/* right column  */}
      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <h2>{`${product.name} `}</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              {/* items of the left coulumn */}
              <Grid item xs={12} md={12}>
               
                

              <Rating  value={ product.average_rating || 0} readOnly />
              </Grid>
              
              {/* <Grid item xs={12} md={12}>
                <p>{`this price was updated ${product.lastupdate} ago`}</p>
              </Grid> */}
              <Grid item xs={12} md={12}>
              <Button
              onClick={toggleFav}
              className="btn"
               startIcon={product.favourite?<FavoriteOutlinedIcon style={{cursor:'pointer',display:'flex'}} onClick={toggleFav} sx={{color:'red'}} />:<FavoriteBorderIcon style={{cursor:'pointer'}}  onClick={toggleFav}/>} 
              >
              <p>Add to favourite</p>
              </Button>
              </Grid>
              <Grid item xs={12} md={12}>
              <Button
              className="btn"
              onClick={toggleAlert}
               startIcon={product.alert?<NotificationsIcon style={{cursor:'pointer',display:'flex'}} onClick={toggleAlert} sx={{color:'green'}} />:<NotificationsOutlinedIcon style={{cursor:'pointer'}}  onClick={toggleAlert}/>} 
              >
              <p>Set price alert</p>
              </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid 
            container 
            columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            rowSpacing={1}
            >
              {/* items on the right coulumn */}
              <Grid item xs={4} md={3}>
                <img
                  className="shops-logo"
                  alt="noon"
                  src= 'https://cdn.vox-cdn.com/thumbor/TMB0K7PcIiuiI4dyRQgpY4U8OCA=/0x0:2040x1360/1400x1400/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23935560/acastro_STK103__03.jpg'
                ></img>
              </Grid>
              <Grid item xs={8} md={8}>
                <div className="pricebtn">
                  <p style={{color:'#fff'}}>{`${product.price} EGB`}</p>
                </div>
              </Grid>
              
              <Grid item md={4} xs={5}></Grid>
              <Grid item md={2} xs={2}>
              <Button
              disabled
              >
              <p style={{fontWeight:'bold',color:'black'}}>SHARE</p>
              </Button>
              </Grid>
             
              <Grid item md={1} xs={1}>
           
              
              <FacebookShareButton
              
                url={'https://www.youtube.com/watch?v=92S4zgXN17o'}
                quote={'Dummy text!'}
                hashtag="#MEMQ">
                  
            <FacebookIcon size={32} round style={{marginTop:15}} /> 
              </FacebookShareButton>
              
              </Grid>
              <Grid item md={1} xs={2}>
    
            <TwitterShareButton
              url={'https://www.example.com'}
              quote={'come and check this product!'}
              hashtag="#MEMQ"

            >
              <TwitterIcon size={32} round  style={{marginTop:15}}/>
              </TwitterShareButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={10} xs={10}>
        <h3 style={{paddingLeft:8}}> Technical specifications </h3>
      </Grid>
      <Grid item md={8} xs={10}>
       {  product.techSpecs &&  product.techSpecs.map(([key,value]) => {
        return <p key={key}>{`${key}: ${value}`} </p>
       })}
       
      </Grid>
       <Grid item md={10} xs={10}>
        
        <PriceChart />
        
       
       </Grid>
       <Grid item md={10} xs={10}>
       <RecomendationSystem/>
       </Grid>
     
       <Grid item md={10} xs={10}>
        <div style={{marginTop:15,paddingBottom:20}}>
          { product.reviews && <ReviewSection  product = {product}/>}
        </div>
       
       </Grid>
    </Grid>
    
  );
};

export default Product;
