import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";

import DeleteIcon from '@mui/icons-material/Delete';


function WishListItem({ item, deleteItem }) {
    const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
    const user = JSON.parse(tmp);
    const isAuth = Boolean(useSelector((state) => state.token));


    const navigate = useNavigate();
    const openProduct = () => {
        navigate(`/product/${item._id}`);
    }
    //to delete product from wishlist
    const delProduct= ()=>{
    //console.log(item._id);
    deleteItem(item._id,user._id);
     }


    //   deleteItem(item._id,user._id);




    return (


        <Container >
            {/* <button onClick={delProduct}> del </button> */}
            <Card


                sx={{
                    maxWidth: "100%",
                    width: "100%",
                    padding: "10px",
                    marginTop: "25px"

                }}>

               
                    <CardMedia
                        component="img"
                        height="220"
                        image={item.image}
                        alt={item.name}
                    />
                    <CardContent>
                        <Tooltip title={item.name} placement="top-start">
                            <Typography noWrap variant="h6" component="div" textAlign="center">
                                {item.name}
                            </Typography>
                        </Tooltip>
                        {!isAuth ?
                            <></>
                            : <> <Typography variant="body2" color="text.secondary" textAlign="center">
                                Price from {item.provider}
                            </Typography>
                            </>}
                        <Typography color="#2F77C6" fontWeight="bold" textAlign="center">
                            {item.priceSymbol} {item.price}
                        </Typography>
                        
                    </CardContent>
                    <CardActionArea>
                    
                            
                            <Button variant="contained" startIcon={<DeleteIcon />} onClick={delProduct}>delete</Button>
                            <Button variant="outlined" sx={{float:'right'}} onClick={openProduct}>view</Button>
                          
                </CardActionArea>
            </Card >
        </Container>



    );
}

export default WishListItem;