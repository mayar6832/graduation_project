
import mongoose from "mongoose";
import reviewMassage from './ReviewMessage.js'
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
  provider: String,

  average_rating:{
    type:Number,
    default:0
},
reviews:[reviewMassage],
favourite:{
  type:Boolean,
  default:false
},
alert:{
  type:Boolean,
  default:false
},
  newrelease: Boolean,

  

});

//create a model
const Product = mongoose.model("product", productSchema);
//Export the model
export default Product;