require("dotenv").config();
const db = require("../../db/index");
const Product = require("../../models/products");


const fs = require("fs");
const categories = [
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

async function run() {
    await db.connect();
    await Product.deleteMany({});
    for (const category of categories) {
        // Read the file
        const products = JSON.parse(fs.readFileSync(`./data/amazon/${category}.json`));
        for (const product of products) {
            //  Destruct the object
            const {
                name,
                image,
                is_best_seller,
                url,
                price_symbol,
                price,
                product_information,
                brand,
                product_category,
                full_description
            } = product;
            //filtter words
            const filteredKeys = ['asin', 'customer reviews'];
            const info = !!product_information
                ? Object.fromEntries(
                    Object.entries(product_information).filter(
                        ([key]) => !filteredKeys.includes(key.toLowerCase())
                    )
                )
                : {};
            const categoryName = category;
            if (price !== null) {
                const newProduct = {
                    name,
                    image,
                    url,
                    brand,
                    isBestSeller: is_best_seller,
                    priceSymbol: price_symbol,
                    price,
                    productInformation: info,
                    productCategory: product_category,
                    fullDescription: full_description,
                    categoryName,
                    provider: "Amazon"
                };
                await Product.create(newProduct);
            }

           

        }
    }
}
run().then(() => console.log("done"))