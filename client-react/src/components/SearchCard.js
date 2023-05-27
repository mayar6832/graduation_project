import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import amazonLogo from './../images/amazonLogo.png';
import { Grid } from '@mui/material';
import { useEffect } from 'react';

function SearchCard({ items, pages, length }) {
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        searchParams.set("page", page)
        setSearchParams(searchParams, { replace: page == 1 })
    }, [page]);
    const handleChange = (e, p) => {
        console.log(e, p)
        setPage(p)

    }

    return (

        <Box
            sx={{
                width: '80%',
                display: "flex",
                flexDirection: "column",
                ml: "auto",
            }}
        >
            <List
                sx={{
                    margin: "10px",
                    bgcolor: 'background.paper',
                    borderLeft: "1px outset #BDBDBD",
                    borderTop: "1px outset #BDBDBD",
                    borderBottom: "1px outset #BDBDBD",
                }}
            >
                <Typography
                    sx={{
                        color: "text.secondary",
                        textAlign: "center"
                    }}
                >
                    {length} results from 2 stores
                </Typography>
                <Divider
                    sx={{
                        mt: "5px"
                    }}
                />

                {items?.map((item, index) => (
                    <div key={index}>
                        <ListItem
                            sx={{
                                alignItems: "center",
                                justifyItems: "start",
                                maxWidth: "1200px",
                                height: "200px",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "cover"
                                }}
                                alt={item.name}
                                src={item.image}
                            />
                            <ListItemText
                                primary={
                                    <Link gutterBottom variant="h6" component="div" underline="hover">
                                        {item.name}
                                    </Link>
                                }
                            />
                            <Box
                                justifyContent="space-between"
                            >
                                <ListItemText
                                    primary={
                                        <Typography
                                            component={'span'}
                                            sx={{
                                                color: "#838B8B",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                border: "1px outset #BDBDBD",
                                                padding: "3px",
                                                marginBottom: "10px",
                                                maxWidth: "200px",
                                                minWidth: "200px",
                                                display: "block"
                                            }}
                                        >
                                            {item.priceSymbol} {item.price}
                                        </Typography>}
                                    secondary={
                                        <Box
                                            component={'span'}
                                            sx={{ minWidth: "200px" }}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"

                                        >
                                            <Link href={item.url} underline="hover">
                                                <Typography component={'span'} sx={{ display: "block" }}>Buy it from </Typography>
                                                <img src={amazonLogo} style={{ height: 60 }} />
                                            </Link>
                                        </Box>
                                    }
                                />
                            </Box>
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