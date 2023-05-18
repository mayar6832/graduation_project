import mongoose from 'mongoose';
import reviewMassage from './ReviewMessage.js'
const productSchema = mongoose.Schema({
    name: String,
    desc: String,
    image: String,
    url: String,
    brand: String,
    isBestSeller: Boolean,
    favourite:Boolean,
    alert:Boolean,
    price: Number,
    priceSymbol: String,
    fullDescription: String,
    productCategory: String,
    techSpecs:[],
    categoryName: String,
    provider: String,
    average_rating:{
        type:Number,
        default:0
    },
    reviews:[reviewMassage]
    
});
const productMassage = mongoose.model('productMassage',productSchema);
export default productMassage;