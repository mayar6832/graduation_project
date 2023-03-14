import Grid from "@mui/material/Grid";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import IconButton from '@mui/material/IconButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

import PriceChart from "./PriceChart";



const Product = ({ product ,toggleFav,toggleAlert}) => {
  // const toggleColor=()=>{
  //   console.log(product.favourite);
  //   product.favourite=!product.favourite;
  //   console.log(product.favourite);

  // }
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
          <Grid item xs={12} md={12}>
            <h2>{`${product.name} - ${product.storage} - ${product.color}`}</h2>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container>
              {/* items of the left coulumn */}
              <Grid item xs={12} md={12}>
               
                
                <Typography component="legend">Read only</Typography>
              <Rating name="read-only" value={product.rate} readOnly />
              </Grid>
              
              <Grid item xs={12} md={12}>
                <p>{`this price was updated ${product.lastupdate} ago`}</p>
              </Grid>
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
                  src={product.noonLogo}
                ></img>
              </Grid>
              <Grid item xs={8} md={8}>
                <div className="pricebtn">
                  <p style={{color:'#fff'}}>{`${product.noonPrice} EGB`}</p>
                </div>
              </Grid>
              <Grid item xs={4} md={3}>
                <img
                  className="shops-logo"
                  src={product.amazonLogo}
                  alt="aaaa"
                />
              </Grid>
              <Grid item xs={8} md={8}>
                <div className="pricebtn">
                  <p style={{color:'#fff'}}> {`${product.amazonPrice} EGP` }  </p>
                </div>
              </Grid>
              <Grid item md={4} xs={5}></Grid>
              <Grid item md={2} xs={2}>
              <Button
              
              >
              <p style={{fontWeight:'bold',color:'black'}}>Share</p>
              </Button>
              </Grid>
             
              <Grid item md={1} xs={1}>
              <IconButton sx={{mt:1.5}} >
              <FacebookOutlinedIcon style={{color:'rgb(25, 118, 210)'}}/>
              </IconButton>
              </Grid>
              <Grid item md={1} xs={2}>
              <IconButton sx={{mt:1.5}} >
              <TwitterIcon style={{color:'rgb(25, 118, 210)'}}/>
              </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={10} xs={10}>
        <h3 style={{paddingLeft:8}}> Technical specifications </h3>
      </Grid>
      <Grid item md={8} xs={10}>
       {product.techSpecs.map(([key,value]) => {
        return <p key={key}>{`${key}: ${value}`} </p>
       })}
      </Grid>
       <Grid item md={10} xs={10}>
        
        <PriceChart />
        
       
       </Grid>
    </Grid>
    
  );
};

export default Product;
