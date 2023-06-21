import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { getWishList, deleteWishListItem } from '../axios';
import WishListItem from '../components/wishListItem';

import { getWishList, deleteWishListItem } from '../axios';
import WishListItem from '../components/wishListItem';

function UserWishList() {
  const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
  const user = JSON.parse(tmp);
  const userId = user._id;
  const [productsBack, setProductsBack] = useState(null);

  useEffect(() => {

    getWishList(userId).then((response) => {
      // console.log(response)
      setProductsBack(response.data)

    });

  }, [userId]);
  console.log(productsBack);
  const removeWishListItem = (productId, userId) => {
    deleteWishListItem(productId, userId).then(response => {
      // console.log(response);
      setProductsBack(response.data);
    })
  }

  return (
    <Grid container spacing={1} >
      <Grid item md={12} xs={10} sm={12}>
        <Typography style={{ fontWeight: 'bold', textAlign: "center", }}>My Wishlist </Typography>
      </Grid>

      {productsBack && productsBack.map((prodBack) => {

        return (<Grid key={prodBack.name} item md={2.5} xs={10}> <WishListItem deleteItem={removeWishListItem} item={prodBack} /> </Grid>)
      })}






    </Grid>
  )
}

export default UserWishList



