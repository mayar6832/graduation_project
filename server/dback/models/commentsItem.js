import mongoose, { Schema } from "mongoose";
import reviewMessage from './reviewMessage.js';

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
    provider: String,
    reviews: [reviewMessage]
});


//create a model
const Product = mongoose.model("product", productSchema);
//Export the model
export default Product;