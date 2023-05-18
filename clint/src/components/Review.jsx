import React, { useState } from "react";
import { Rating,Paper,Box , TextField, Button,Typography, Grid,List,ListItem,Avatar,Divider} from "@mui/material";
import { useDispatch } from "react-redux";
import { RevProduct } from  '../actions/product';


const ReviewSection = ({ product }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews,setReviews] = useState(product?.reviews)
  // const user = JSON.parse(localStorage.getItem('User'));
  
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = async () => {
    
    // event.preventDefault();
    if(rating === 0){
      const finalComment = {
        rate :null,
        Comment: review,
      }; 
      const newReviwes= await dispatch(RevProduct(finalComment,product._id));

      setReview('');
      setReviews(newReviwes);
    }
    else{
    const finalComment = {
      rate :rating,
      Comment: review,
    };
    const newReviwes= await dispatch(RevProduct(finalComment,product._id));
    setRating(0);
    setReview('');
    setReviews(newReviwes);
  }

    
   
   
    
  };


  return (
    <div>
      { product.reviews.length?
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
        maxHeight: 350,
        '& ul': { padding: 0 },
        
      }}
      subheader={<li />}>
          {  reviews.map((r)=>( 
             <ListItem key={r._id}>
            
          <Paper  style={{borderRadius:50,backgroundColor:'gainsboro',margin:5 ,width:'100%'}}>
            <Grid container spacing={1}>
            <Grid item>
            <Avatar alt="Remy Sharp" src="https://www.shutterstock.com/image-vector/male-figure-man-boy-profile-260nw-1647374107.jpg" />
              </Grid>
              <Grid item>
              <Typography style={{paddingTop:7}} > John Doe </Typography>
              </Grid>  
              </Grid>
          
         
          <Box style={{padding:30}}>
            <Grid container>
              <Grid item >
                { r.rate &&
              <Typography style={{paddingBottom:5}} > Rating: </Typography>
                }
              </Grid>
              {r.rate &&
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
            <Divider sx={{marginBottom:4,marginTop:4}}>Leave Review</Divider>
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