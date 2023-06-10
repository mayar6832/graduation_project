import Grid from "@mui/material/Grid";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Rating from '@mui/material/Rating';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import PriceChart from "./PriceChart";
import RecomendationSystem from "./RecomendationSystem";
import ReviewSection from "./Review";
import {favouriteProduct,alertProduct} from '../../axios';

import React ,{useState} from 'react';
import { Typography,Box,Link } from "@mui/material";
import amazonLogo from "./../../images/amazonLogo.png";
import jumiaLogo from "./../../images/JumiaLogo.png";



const Product = ({ product,recomendations }) => {
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
  const user = JSON.parse(tmp);
  const userId = user._id;
  console.log(product)

  function printObject(obj) {
    return Object.entries(obj).map(([key, value]) => (
      <p style={{marginLeft:10,marginBottom:1}} key={key} >{`${key} : ${value}`}</p>
    ));
    
  }
  
  const [fav,setFav] = useState(product.favourite);

  const [alert,setAlert] = useState(product?.alert);
  const toggleFav = ()=>{
   
    console.log(`user : ${userId}, product ${product._id}`)
    favouriteProduct(userId,product._id).then(response=>setFav(response.data));
   }

   const toggleAlert = ()=>{
    alertProduct(userId,product._id).then(response=>setAlert(response.data));
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
          <Grid item xs={12} md={7}>
            <Typography variant="h6" >{`${product.name} `}</Typography>
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
               startIcon={fav?<FavoriteOutlinedIcon style={{cursor:'pointer',display:'flex'}} onClick={toggleFav} sx={{color:'red'}} />:<FavoriteBorderIcon style={{cursor:'pointer'}}  onClick={toggleFav}/>} 
              >
              {fav? <p>REMOVE FROM WISHLIST</p> :<p>Add TO WISHLIST</p>}    
              </Button>
              </Grid>
              <Grid item xs={12} md={12}>
              <Button
              className="btn"
              onClick={toggleAlert}
               startIcon={alert?<NotificationsIcon style={{cursor:'pointer',display:'flex'}} onClick={toggleAlert} sx={{color:'green'}} />:<NotificationsOutlinedIcon style={{cursor:'pointer'}}  onClick={toggleAlert}/>} 
              >
               {alert? <p>REMOVE PRICE ALERT</p>  :<p>SET PRICE ALERT</p>}
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
              <Grid item xs={12} md={3}>
              <Box
               component={"span"}
              //  sx={{ minWidth: "200px" }}
               display="flex"
               alignItems="center"
               justifyContent="center"
               >
                <Link href={product.url} underline="hover" target="_blank"
               onClick={(e) => {
                e.stopPropagation();
               }}
                >
                <Typography
                component={"span"}
                 sx={{ display: "block" }}
                    >
                   Buy it from{" "}
                </Typography>
                <>
                {product.provider === "Amazon" ? (
                 <img src={amazonLogo} style={{ height: 60 }} />
                 ) : (
                  <img src={jumiaLogo} style={{ height: 60 }} />
                  )}
                  </>

                  </Link>
                    </Box>
              </Grid>
              <Grid item xs={12} md={8}>
              <Typography
                  component={"span"}
                  onClick={(e) => {
                    e.stopPropagation();
                    }}
                   sx={{
                   color: "#838B8B",
                   fontWeight: "bold",
                   textAlign: "center",
                   border: "1px outset #BDBDBD",
                   padding: "3px",
                
                   display: "block",
                            }}>
                  {product.priceSymbol} {product.price}
                    </Typography>
              </Grid>
              
              <Grid item md={4} xs={5}>
               
              </Grid>
              <Grid item md={2} xs={2}>
              <Button
              disabled
              >
              <p style={{fontWeight:'bold',color:'black',marginTop:15}}>SHARE</p>
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
       {product.fullDescription!=null?  <Typography variant="h6" sx={{fontWeight:'bold',marginBottom:1}} >Product Description </Typography> :<Typography></Typography> }
      </Grid>
      <Grid item md={10} xs={10}>

   <Typography variant="body2" style={{marginLeft:10,marginBottom:1}}> {product.fullDescription}</Typography>     
      </Grid>
      <Grid item md={10} xs={10}>
      {product.productInformation?<Typography variant="h6" style={{fontWeight:'bold', marginBottom:1}}>Product Specifications </Typography>: <Typography></Typography>}  
      </Grid>
    
      <Grid item md={8} xs={10}>
{   product.provider === "Amazon" &&product.productInformation ? printObject(product.productInformation):product.productInformation }
       
      </Grid>
      
      
       <Grid item md={10} xs={10}>
        
        <PriceChart prices={product.oldPrices} />
        
       
       </Grid>
       <Grid item md={12} xs={10}>
       <RecomendationSystem recomendations={recomendations}/>
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
