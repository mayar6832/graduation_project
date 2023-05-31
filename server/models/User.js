import mongoose, { Schema } from "mongoose";
import reviewMassage from './ReviewMessage.js'

import product from './products.js';


const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    
    
    
    picturePath: {
      required: true,
      type: String,
    },
    reviews:[reviewMassage],
    wishlist:[{
      type:Schema.Types.ObjectId,
      ref:'product'
    }],
    alerts:[{
      type:Schema.Types.ObjectId,
      ref:'product'
    }]
    
  
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;