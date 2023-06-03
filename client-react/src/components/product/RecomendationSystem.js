import { Grid } from '@mui/material'
import ProductCard from '../ProductCard'
import React from 'react'

const recomendationSystem = ({recomendations}) => {
  return (
    <Grid container>

   
    {recomendations && recomendations.map((recomendation)=>{

      // console.log(recomendation[0])
      return  <Grid item> <ProductCard item={recomendation[0]}/></Grid>
    })}
     </Grid>
  )
}

export default recomendationSystem