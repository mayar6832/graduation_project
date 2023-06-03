import dotenv from "dotenv";
import db from "../../db/index.js"
import Product from "../../models/products.js";
import fs from "fs"

dotenv.config()

function readCSV(filepath, separator = ",") {
    /** Reads a csv file, taking into consideration linebreaks inside of fields, and double quotes or no quotes.
     * Converts it into a json object
     */
    //   const fp = new URL(filepath, import.meta.url);
    const file = fs.readFileSync(filepath, { encoding: "utf-8" });

    // Figure out how many cells there are by counting the first line.
    // ATTENTION: If your header contains commas or a linebreak, this will fail.
    const firstLineBreak = file.indexOf("\n");
    const rowsNum = file.slice(0, firstLineBreak).split(",").length;

    // Construct a regex based on how many headers there are
    const singleCellRegex = `(?:(?:"([\\s\\S]*?)")|((?:(?:[^"${separator}\\n])|(?:""))+))`;
    let regexText = "";

    for (let i = 0; i < rowsNum; i++) {
        regexText += "," + singleCellRegex;
    }

    const regex = new RegExp(regexText.slice(1), "g");
    const results = file.matchAll(regex);

    const rowsArr = [];
    for (const row of results) {
        const newRow = [];

        for (let i = 0; i < rowsNum; i++) {
            const rowValue = row[2 * i + 1] ?? row[2 * i + 2];
            newRow.push(rowValue.replaceAll('""', '"')); // Remove double double quotes
        }

        rowsArr.push(newRow);
    }

    const headers = rowsArr[0];
    const rows = rowsArr.slice(1);

    return rows.map((row) =>
        row.reduce((jsonRow, field, idx) => {
            const key = headers[idx].replace("﻿", "");
            jsonRow[key === "nmae" ? "name" : key.toLowerCase()] = field;
            return jsonRow;
        }, {})
    );
}

const files = [
    "beauty",
    "books",
    "computer",
    "entertainment",
    "fashion",
    "mobile",
    "sport",
    "tablet",
    "television",
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
    for (const file of files) {
        const csvFile = readCSV(`./data/jumia/${file}.csv`);
        console.log(file, csvFile.length);
        for (const product of csvFile) {
            //  Destruct the object
            const {
                name,
                image,
                url,
                is_best_seller,
                price,
                productinformation: productInformation,
                fulldescription: fullDescription,
            } = product;
            const categoryName = file;
            if (!isNaN(parseFloat(price.replace(/[^0-9.-]+/g, "")))) {
                const calcprices = parseFloat(price.replace(/[^0-9.-]+/g, "")) || 100;
                const newProduct = {
                    name,
                    image,
                    url,
                    brand: "Jumia",
                    isBestSeller: is_best_seller?.toLowerCase() === "true",
                    priceSymbol: "EGP",
                    price:calcprices,
                    oldPrices: getOldPrices(calcprices),
                    productInformation,
                    productCategory: categoryName,
                    fullDescription,
                    categoryName,
                    provider: "Jumia",
                };
                await Product.create(newProduct);
                //   console.log(newProduct);
            }
        }
        //   fs.writeFileSync(`./jumia/json/${file}.json`, JSON.stringify(csvFile));
    }
}
run().then(() => console.log("done"))
