import React, { useState } from "react";
import { Rating,Paper,Box , TextField, Button,Typography, Grid,List,ListItem,Avatar,Divider} from "@mui/material";
import { reviewProd } from '../../axios' 


const ReviewSection = ({ product }) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews,setReviews] = useState(product?.reviews)
  
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
    const user = JSON.parse(tmp);
    console.log(user.firstName);
    const userName = user.firstName+' '+user.lastName;
    const pic = user.picturePath;
    
    const uId = user._id;
     console.log(uId);
    // console.log(pic)

    // console.log(userName);
    console.log(user);
  

  const handleChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = async () => {
  
   
    if(rating === 0 && review === '' ){
      return ;
     

    }
   
    else{
    const date =  Date.now(); 
    const finalComment = {
      rate :rating,
      Comment: review,
      date : date,
      userName:userName,
      userImage:pic,
      userId:uId,
      productName:'',

    };
   
  
      reviewProd(finalComment,product._id).then((response) => {
        console.log(response.data.reviews);
    
        setReviews(response.data.reviews)
      
    });
     
    // const newReviwes= await dispatch(RevProduct(finalComment,product._id));
    setRating(0);
    setReview('');
    // setReviews(newReviwes);
  }

    
   
   
    
  };


  return (
    <div>
      { reviews.length?
        <div>
          
      <Typography style={{fontWeight:'bold',textAlign:"center",}}>
      Reviews 
      </Typography>
       <List sx={{
        textAlign: "center",
        margin:"auto",
        width: '100%',
        maxWidth: "80%",
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 310,
        '& ul': { padding: 0 },
        
      }}
      subheader={<li />}>
          {  reviews.map((r)=>( 
             <ListItem key={r._id}>
            
          <Paper  style={{borderRadius:50,backgroundColor:'gainsboro',margin:5 ,width:'100%',padding:8}}>
           
          
              
          <Box style={{paddingLeft:15,paddingTop:2, paddingBottom:8}}>
          <Grid container spacing={1}>
            <Grid item>
            <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${r.userImage}`} />
              </Grid>
              <Grid item>
              <Typography style={{paddingTop:7}} >  {r.userName}  </Typography>
              </Grid>  
             <Grid item md ={12}  >
              <Typography sx={{fontSize:12,padding:1,opacity:0.5}}> 
              {new Date(r.date).toLocaleDateString('en-US',options)}
              </Typography>
              </Grid>
              </Grid>
            <Grid container>
              <Grid item >
                { r.rate!==0 &&
              <Typography style={{paddingBottom:5}} > Rating: </Typography>
                }
              </Grid>
              {r.rate!==0 &&
              <Grid item md={3} >
                <div style={{paddingTop:2}}>
               
              <Rating
            name="rating"
            readOnly
            value={  r.rate || 0}
            size="small"
            color="primary"
            // sx={{display:"flex"}}
          />
                
          </div>
              </Grid>
              }
              
              <Grid item md={9}>
                { r.Comment &&
              <TextField
            variant="standard"
            style={{width:'100%'}}
            type="text"
            InputProps={{
              readOnly: true,
            }}
            value={r.Comment}
            
          />
        }
              </Grid>
             
            </Grid>
          
          </Box>
          </Paper>
          
          </ListItem>
            ))}
            </List>
            </div>:
            <Typography sx={{textAlign:"center"}}>  No Reviews Yet! </Typography>
            }
            <Divider sx={{marginBottom:4,marginTop:4}}>Leave a Review</Divider>
            
      <Paper style={{borderRadius:50,backgroundColor:'gainsboro'}}>
      <Box style={{padding:30}}>
        <Grid container>
          <Grid item  >
          <Typography style={{paddingBottom:5}} > Rating: </Typography>
          </Grid>
          <Grid item md={3} >
            <div style={{paddingTop:2}}>
          <Rating
        name="rating"
        value={rating}
        onChange={handleChange}
        size="small"
        color="primary"
        // sx={{display:"flex"}}
      />
      </div>
          </Grid>
          <Grid item md={9}>
          <TextField
        variant="standard"
        style={{width:'100%'}}
        type="text"
        placeholder="Write a review..."
        
        value={review}
        onChange={(event) => setReview(event.target.value)}
      />
          </Grid>
          <Grid item md={3} sm={12}  > 
          <div style={{textAlign:"center"}}>
        <Button style={{borderRadius:50, display:"flex", float: 'right' ,marginTop:10}} variant="contained" onClick={handleSubmit}>Submit</Button>
        </div>
        </Grid>
        </Grid>
      
      </Box>
      </Paper>
      
    </div>
  );
};

export default ReviewSection;