import mongoose from "mongoose";

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
  
  },
  { timestamps: true }
);

//create a model
const user = mongoose.model("User", UserSchema);
//Export the model
export default user;