import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import amazonLogo from "./../images/amazonLogo.png";
import jumiaLogo from "./../images/JumiaLogo.png";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";

function SearchCard({ items, pages, length }) {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        searchParams.set("page", page);
        setSearchParams(searchParams, { replace: page == 1 });
    }, [page]);
    const handleChange = (e, p) => {
        console.log(e, p);
        setPage(p);
    };
    const openProduct = (id) => {
        navigate(`/product/${id}`);
    }
    const isAuth = Boolean(useSelector((state) => state.token));
    const storeImg = amazonLogo;


    return (
        <Box
            sx={{
                width: { lg: "80%", xs: "100%" },
                display: "flex",
                flexDirection: "column",
                ml: "auto",
            }}
        >
            <List
                sx={{
                    margin: "10px",
                    bgcolor: "background.paper",
                    borderLeft: "1px outset #BDBDBD",
                    borderTop: "1px outset #BDBDBD",
                    borderBottom: "1px outset #BDBDBD",
                }}
            >
                <Typography
                    sx={{
                        color: "text.secondary",
                        textAlign: "center",
                    }}
                >
                    {length} results from 2 stores
                </Typography>
                <Divider
                    sx={{
                        mt: "5px",
                    }}
                />

                {items?.map((item, index) => (
                    <div style={{ width: "100%" }} key={index}>
                        <ListItem
                            onClick={() => openProduct(item._id)}
                            sx={{
                                alignItems: "center",
                                justifyItems: "start",
                                width: "100%",
                            }}
                        >
                            <Card
                                sx={{
                                    display: "flex",
                                    width: "100%",
                                    flexDirection: { xs: "column", lg: "row" },
                                    alignItems: { xs: "center", lg: "start" },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    sx={{ maxWidth: "350px", objectFit: "contain" }}
                                    image={item.image}
                                    alt={item.name}
                                />
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component={Link}
                                        underline="hover"
                                        gutterBottom
                                    >
                                        {item.name}
                                    </Typography>
                                </CardContent>

                                <CardActions sx={{ marginLeft: { lg: "auto" } }}>
                                    {!isAuth ? (
                                        <Button
                                            variant="contained"
                                            sx={{
                                                marginLeft: 1,
                                                backgroundColor: "#2F77C6",
                                                textTransform: "capitalize",
                                                minWidth: "200px",
                                            }}
                                        >
                                            Buy now
                                        </Button>
                                    ) : (
                                        <>
                                            <ListItemText
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                primary={
                                                    <Typography
                                                        component={"span"}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                        }}
                                                        sx={{
                                                            color: "#838B8B",
                                                            fontWeight: "bold",
                                                            textAlign: "center",
                                                            border: "1px outset #BDBDBD",
                                                            padding: "3px",
                                                            marginBottom: "10px",
                                                            maxWidth: "200px",
                                                            minWidth: "200px",
                                                            display: "block",
                                                        }}
                                                    >
                                                        {item.priceSymbol} {item.price}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box
                                                        component={"span"}
                                                        sx={{ minWidth: "200px" }}
                                                        display="flex"
                                                        alignItems="center"
                                                        justifyContent="center"
                                                    >
                                                        <Link href={item.url} underline="hover" target="_blank"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <Typography
                                                                component={"span"}
                                                                sx={{ display: "block" }}
                                                            >
                                                                Buy it from{" "}
                                                            </Typography>
                                                            <>
                                                                {item.provider === "Amazon" ? (
                                                                    <img src={amazonLogo} style={{ height: 60 }} />
                                                                ) : (
                                                                    <img src={jumiaLogo} style={{ height: 60 }} />
                                                                )}
                                                            </>

                                                        </Link>
                                                    </Box>
                                                }
                                            />
                                        </>
                                    )}
                                </CardActions>
                            </Card>
                        </ListItem>
                        <Divider variant="middle" />
                    </div>
                ))}
            </List>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={3}>
                    <Pagination count={pages} onChange={handleChange}></Pagination>
                </Grid>
            </Grid>
        </Box>
    );
}
export default SearchCard;