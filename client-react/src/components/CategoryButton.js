import * as React from "react";
import Link from "@mui/material/Link";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { Link as RouterLink, NavLink } from 'react-router-dom'

const pages = [
    "Mobile",
    "Tablet",
    "Computer",
    "Software",
    "television",
    "gardening",
    "fashion",
    "beauty",
    "kids",
    "sports",
    "book",
    "entertainment",
    "food",
    "beverages",
];

function CategoryButton() {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: "2rem",
                paddingBottom: "1rem",
            }}
        >
            <Stack
                direction="row"
                flexWrap="wrap"
                alignItems="center"
                sx={{
                    maxWidth: "1250px",
                }}
            >
                {pages.map((page) => (
                    <Link
                    component={RouterLink}
                        key={page}
                        sx={{
                            backgroundColor: "#EDEDED",
                            border: "1px solid 	#525C65",
                            borderRadius: "20px",
                            color: "black",
                            textTransform: "capitalize",
                            p: "10px",
                            minWidth: "100px",
                            marginRight: "1rem",
                            marginBottom: "1rem",
                            textAlign: "center",
                            "&:hover": {
                                backgroundColor: "#525C65",
                                color: "white",
                            },
                        }}
                        underline="none"
                        to={`category/${encodeURIComponent(page)}`}
                    >
                        {page}
                    </Link>
                ))}
            </Stack>
        </Box>
    );
}
export default CategoryButton;