import dotenv from "dotenv";
import db from "../../db/index.js"
import Product from "../../models/products.js";
import fs from "fs"


dotenv.config()

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

const getOldPrices = (price) => {
    // Based on the U.S. Bureau of Labor Statistics: The BLS is a federal agency that collects data on prices and wages. The BLS publishes a monthly report called the Consumer Price Index (CPI), which tracks the change in prices for a basket of goods and services. The CPI can be used to calculate the inflation rate, which is the rate at which prices are rising.
    // Month | Average Change Percentage
    // ------- | ------------------------
    // January | 1.2%
    // February | 1.5%
    // March | 1.8%
    // April | 2.1%
    // May | 2.4%

    // price: is the current price
    // inflationRates: is an array of the inflation rates for the previous 5 months
    const inflationRates = [1.2, 1.5, 1.8, 2.1, 2.4];
    const oldPrices = [];
    for (let i = 0; i < 5; i++) {
        // calculate the old price based on the inflation rate
        const oldPrice = price / (1 + inflationRates[i] / 100);
        // push the old price to the array
        oldPrices.push(oldPrice);
    }
    return oldPrices;
};

async function run() {
    await db();
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
                    oldPrices: getOldPrices(+price),
                    productInformation: info || null,
                    productCategory: product_category || null,
                    fullDescription: full_description || null,
                    categoryName,
                    provider: "Amazon",
                };
                await Product.create(newProduct);
            }



        }
    }
}
run().then(() => console.log("done"))