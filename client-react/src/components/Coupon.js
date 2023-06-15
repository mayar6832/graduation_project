import React from 'react'
import { Paper,Box ,Typography} from "@mui/material";
function Coupon() {
  return (
    <Paper  style={{borderRadius:50,backgroundColor:'gainsboro',margin:'auto' ,width:'80%',padding:8}}>
           
          
              
    <Box style={{paddingLeft:15,paddingTop:2, paddingBottom:8,margin:'auto',}} sx={{textAlign:'center'}} >
        <Typography variant='h6' style={{width:'70%',margin:'auto',}} sx={{textAlign:'center'}} >{ `Dear valuable customer congratulations on receiving a sale coupon with value 10% on your next purchase through MEMQ please Keep your active behavior sothat we can improve our service more `}</Typography>
    </Box>
    
    </Paper>
  )
}

export default Coupon