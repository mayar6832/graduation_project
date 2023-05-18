const mongoose = require("mongoose");
require("mongoose-type-url");

//create schema
const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    url: String,
    brand: String,
    isBestSeller: Boolean,
    price: Number,
    priceSymbol: String,
    fullDescription: String,
    productCategory: String,
    productInformation: {},
    categoryName: String,
    provider: String
});
//create a model
const Product = mongoose.model("product", productSchema);
//Export the model
module.exports = Product;