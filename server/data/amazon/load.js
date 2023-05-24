import request from "request-promise";
import fs from "fs";

const apiKey = "214023c06cc55cb3866a5508858154e6";
const ar = "ar_AE";
const en = "en_AE";
const queries = [
    "mobile",
    "tablet",
    "computer",
    "software",
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

// Product: title, image, price, url, description, information
// 1. Search for products and save to csv
// 2. Get product details and save to csv

const generateAmazonUrl = (apiKey) =>
    `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=https://www.amazon.eg`;

const getProductsSearch = async (lng, query, page) => {
    try {
        const endpoint = `${generateAmazonUrl(
            apiKey
        )}/s?k=${query}&language=${lng}&page=${page}`;
        console.log(endpoint);
        const response = await request(endpoint);
        return JSON.parse(response);
    } catch (error) {
        return error;
    }
};

const getProduct = async (url) => {
    try {
        const response = await request(
            `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true&url=${url}`
        );
        return JSON.parse(response);
    } catch (error) {
        return error;
    }
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const getAllProducts = async (lng, queries, page) => {
    try {
        for (const query of queries) {
            console.log("Processing the ", query);
            const response = await getProductsSearch(lng, query, page);
            const { results, pagination } = response;
            const products = [];
            // Sleep for 1 seconds
            await sleep(1000);
            if (results && results?.length > 0) {
                for (const product of results) {
                    console.log("Processing the product ", product.position);
                    const { url } = product;
                    const productDetails = await getProduct(url);
                    products.push({ ...product, ...productDetails });
                    await sleep(1000);
                }
                fs.readFile(`./products/${query}.json`, "utf8", function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    const allProducts = [...JSON.parse(data), ...products];
                    fs.writeFile(
                        `./products/${query}.json`,
                        JSON.stringify(allProducts),
                        "utf8",
                        function (err) {
                            if (err) {
                                return console.log(err);
                            }

                            console.log("The file was saved!");
                        }
                    );
                });
            }
        }
    } catch (error) {
        return error;
    }
};

// response: { ads, amazon_choice, results, explore_more_items, pagination }
getAllProducts(en, queries, 2)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
