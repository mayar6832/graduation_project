import React from 'react'
import { Rating,Paper,Box , TextField,Typography, Grid,Avatar} from "@mui/material";
const UserRev = ( {reviews} ) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div>

    <Typography style={{fontWeight:'bold',textAlign:"center",}}>
     My Reviews 
      </Typography>
      
          {  reviews.map((r)=>( 
             < div  key={r._id} style={{width:"80%", margin: 'auto'}} >
            
          <Paper  style={{borderRadius:50,backgroundColor:'gainsboro',margin:5 ,width:'100%',padding:8}}>
           
          
              
          <Box style={{paddingLeft:15,paddingTop:2, paddingBottom:8}}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
          <p style={{opacity:0.5}} >{`On ${r.productName}`}</p>
            </Grid>
            <Grid item>
            <Avatar alt="Remy Sharp" src={`data:image/jpeg;base64, ${r.userImage}`} />
              </Grid>
              <Grid item>
              <Typography style={{paddingTop:7}} >  {r.userName}  </Typography>
              </Grid>  
             <Grid item md ={12} xs={12} >
              <Typography sx={{fontSize:12,padding:1,opacity:0.5}} > 
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
              <Grid item   md={3} >
                <div style={{paddingTop:2}}>
               
              <Rating
            name="rating"
            readOnly
            value={  r.rate || 0}
            size="small"
            color="primary"
            
          />
                
          </div>
              </Grid>
              }
              
              <Grid item  xs={12} md={9}>
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
          
          </div>
            ))}
            
            </div>
  )
}

export default UserRev