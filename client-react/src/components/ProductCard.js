import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Hidden } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useSelector } from "react-redux";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";


 
  
function ProductCard({ item }) {

    const isAuth = Boolean(useSelector((state) => state.token));
    const tmp = JSON.parse(window.localStorage.getItem("persist:root")).user;
    const user = JSON.parse(tmp);


const navigate = useNavigate();
   const openProduct= ()=>{
    navigate(`/product/${item._id}`);
   }
//to delete product from wishlist
   const delProduct= ()=>{
    console.log(item._id);
  
   }




    return (
        <Container>
            {/* <button onClick={delProduct}> del </button> */}
            <Card
                onClick={openProduct}
                sx={{
                    maxWidth: "220px",
                    width: "295px",
                    padding: "10px",
                    marginTop: "25px"

                }}>

                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="220"
                        sx={{ maxWidth: "350px", objectFit: "contain" }}
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
                            : <>
                                {item.provider === "Amazon" ? (
                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        Price from Amazon
                                    </Typography>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" textAlign="center">
                                        Price from Jumia
                                    </Typography>
                                )}
                            </>}
                        <Typography color="#2F77C6" fontWeight="bold" textAlign="center">
                            {item.priceSymbol} {item.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card >
        </Container>
    );
}
export default ProductCard;