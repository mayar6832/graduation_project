import { log } from "console";
import User from "../models/User.js";
import product from '../models/products.js'
import fs from "fs";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);

    // get the image from the server and send the file to the client
    const image = fs.readFileSync(user.picturePath, { encoding: "base64" });
    user.picturePath = image;

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id, firstName, lastName, email } = req.body;
    let updatedUser;
    if (!_id) {
      return res.status(400).json({ message: 'Please enter all required fields' });
    }

    if (!req.file) {
      await User.updateOne({ _id }, { firstName, lastName, email });

    } else {
      const picturePath = req.file.path;

      await User.updateOne({ _id }, { firstName, lastName, email, picturePath });

    }

    updatedUser = await User.findById(_id);
    const image = fs.readFileSync(updatedUser.picturePath, { encoding: "base64" });
    updatedUser.picturePath = image;

    // get the image from the server and send the file to the client
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('error', error.message);
  }
};

// getting the user reviews from reviews array in user table
export const getUserReviews = async (req, res)=>{
try {
  const { id } = req.params;
  const currentUser = await User.findById(id);
  // console.log(currentUser);
  const currentUserReviews = currentUser.reviews;
  res.status(200).json(currentUserReviews);  
} catch (error) {
  res.status(401).json({msg:error.message})
}



}  
export const getUserWishlist = async (req, res)=>{
  try {
    const { id } = req.params;
    // const {userId} = req.body;

    const currentUser = await User.findById(id);
    const userWishlist = currentUser.wishlist;
   const wishListProducts = await getProductsByIds(userWishlist);

    
    res.status(200).json(wishListProducts
    );  
  } catch (error) {
    res.status(401).json({msg:error.message})
  }
  
  
  
  }  
  export const deleteWishListItem = async(req,res) => {
    try{
    const { id } = req.params;
    const { productId } =req.body;
    const user = await User.findById(id);
    user.wishlist.remove({
      _id : productId
  })
  const updatedUser = await User.findByIdAndUpdate(id,user,{new:true});
  const wishListProducts = await getProductsByIds(updatedUser.wishlist);
  res.status(200).json(wishListProducts);

    }catch(err){
      res.status(404).json({msg:err.message});
    }
  }

  export const delNotification = async(req,res) => {
    try{
    const { id } = req.params;
    
    const user = await User.findById(id);
    user.notifications = [];
  const updatedUser = await User.findByIdAndUpdate(id,user,{new:true});
  
  res.status(200).json(updatedUser);

    }catch(err){
      res.status(404).json({msg:err.message});
    }
  }
  export const getNotifications = async(req,res) => {
   try {
    const { id } = req.params;
    console.log(id)
    
    const user = await User.findById(id);
    console.log(user.firstName)
    const notifications = user.notifications;
    console.log(''+user.notifications)
    res.status(200).json(notifications);
   } catch (error) {
    res.status(405).json({msg:error.message});
   }
  }
export const getCoupon = async(req,res) => {
try {
  const { id } = req.params;
  const user = await User.findById(id);
  console.log(user.hasCoupon);
  res.status(200).json(user.hasCoupon);

} catch (error) {
  res.status(405).json({msg:error.message});
}
}


 async function  getProductsByIds(ids) {
    const products = [];
  
    
    for (const id of ids) {
      const prod = await product.findById(id);
      products.push(prod);
    }
  
    return products;
  }
  