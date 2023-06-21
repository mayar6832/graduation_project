import SearchCard from "./../components/SearchCard";
import PriceFilter from "./../components/PriceFilter";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Stack } from "@mui/material";

function NewReleases() {
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [numProduct, setNumProduct] = useState([]);
    const getProduct = () => {
        axios
            .post(
                `http://localhost:3001/product/search_product?page=${searchParams.get(
                    "page"
                )}`,
                {
                    search: searchParams.get("q"),
                    maxPrice: searchParams.get("priceto"),
                    minPrice: searchParams.get("pricefrom"),
                    newrelease: true,
                }
            )
            .then((res) => {
                console.log(res.data.data);
                setTotalPages(res.data.total_pages);
                setNumProduct(res.data.length);
                setItems(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getProduct();
    }, [searchParams]);
    return (
        <>
            

            <Stack direction="row" spacing={2}>
                <PriceFilter />
                <SearchCard items={items} pages={totalPages} length={numProduct} />
            </Stack>

            
        </>
    );
}

export default NewReleases;
