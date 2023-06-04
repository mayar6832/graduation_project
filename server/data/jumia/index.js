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
    "food",
    "phone",
    "sport",
    "tablet",
    "television",
];

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
                const newProduct = {
                    name,
                    image,
                    url,
                    brand: "Jumia",
                    isBestSeller: is_best_seller?.toLowerCase() === "true",
                    priceSymbol: "EGP",
                    price: parseFloat(price.replace(/[^0-9.-]+/g, "")),
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
