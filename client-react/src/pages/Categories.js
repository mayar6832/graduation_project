import SearchCard from './../components/SearchCard';
import PriceFilter from './../components/PriceFilter';

import { useParams } from "react-router-dom";
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useState } from 'react';
import { Stack } from '@mui/material';

function Categories() {
    const { categoryName } = useParams();
    console.log(categoryName)
    const [searchParams] = useSearchParams();
    const [items, setItems] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [numProduct, setNumProduct] = useState([]);
    useEffect(() => {
        const getProduct = () => {
            axios.post(`http://localhost:3001/product/search_category?page=${searchParams.get('page')}`, {
                "search":categoryName , "maxPrice": searchParams.get("priceto"), "minPrice": searchParams.get("pricefrom")
            })
                .then(res => {
                    console.log(res.data.data)
                    setTotalPages(res.data.total_pages)
                    setNumProduct(res.data.length)
                    setItems(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getProduct();
    }, [categoryName,searchParams]);
    return (
        <>
            
            <Stack direction="row" spacing={2} flexWrap="wrap">
            
           
                <PriceFilter />
                <SearchCard items={items} pages={totalPages} length={numProduct}/>
            </Stack>
            
        </>


    );
}

export default Categories;