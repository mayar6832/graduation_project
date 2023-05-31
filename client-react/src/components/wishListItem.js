import { Grid,Card,Paper} from '@mui/material'
import React from 'react'

function wishListItem({product}) {
  return (
    <Card>

     <Paper  style={{borderRadius:50,backgroundColor:'gainsboro',margin:5 ,width:'100%',padding:8}}>
     <Grid container>
     <Grid item height={350} xs={10} md={3}>
        <img
           
          className="image"
          alt="sss"
          src={product.image}
        ></img>
      </Grid>
      <Grid item md={3} xs={10} >
       <p>{product.name}</p>

      </Grid>
      <Grid item md={3} xs={10} >
        <p>{product.price}</p>
      </Grid>

    </Grid>
    </Paper>
    </Card>
  );
}

export default wishListItem