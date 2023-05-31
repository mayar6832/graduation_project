import product from '../models/products.js';
import User from '../models/User.js';
//search product 
const searchProduct = async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const limit =+req.query.limit ||25;
        const skip = (page - 1) * limit;
        const search = req.body.search || "";
        const maxPrice = req.body.maxPrice || 100000;
        const minPrice = req.body.minPrice || 0;
        const filters = [];
        if (req.body.search) {
            filters.push({ name: { $regex: ".*" + search + ".*", $options: "i" } });
            filters.push({
                categoryName: { $regex: ".*" + search + ".*", $options: "i" },
            });
        }
        if (req.body.maxPrice || req.body.minPrice) {
            filters.push({ price: { $gte: minPrice, $lte: maxPrice } });
        }
        if (req.body.isBestSeller) {
            filters.push({ isBestSeller: true });
        }
        if (req.body.newrelease) {
            filters.push({ newrelease: true });
        }
        const product_data = await product
            .find({
                $and: filters,
            })
            .skip(skip)
            .limit(limit);
        const query = await product.find({
            $and: filters,
        });
        const total_pages = Math.ceil(query.length / limit) || 1;
        const length = query.length;
        if (product_data.length > 0) {
            res.status(200).send({
                success: true,
                msg: "products details",
                total_pages,
                page,
                length,
                data: product_data,
            });
        } else {
            res.status(200).send({ success: true, msg: "products not found!" });
        }
    } catch (error) {
        res.status(404).send({ success: false, msg: error.message });
    }
};
//category search 
const searchCategory = async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 25;
        const skip = (page - 1) * limit;
        const search = req.body.search || "";
        const maxPrice = req.body.maxPrice || 100000;
        const minPrice = req.body.minPrice || 0;
        const filters = [];
        if (req.body.search) {
            filters.push({ "categoryName": { $regex: ".*" + search + ".*", $options: 'i' } })
        }
        if (req.body.maxPrice || req.body.minPrice) {
            filters.push({ "price": { $gte: minPrice, $lte: maxPrice } })
        }
        const product_data = await product.find(
            {
                "$and": filters
            }
        ).skip(skip).limit(limit);
        const query = await product.find(
            {
                "$and": filters
            }
        )
        const total_pages = Math.ceil(query.length / limit) || 1;
        const length = query.length;
        if (product_data.length > 0) {
            res.status(200).send({
                success: true, msg: "products details", total_pages, page, length, data: product_data
            })
        } else {
            res.status(200).send({ success: true, msg: "products not found!" })
        }
    }
    catch (error) {
        res.status(404).send({ success: false, msg: error.message })
    }
}
// gatting one product by its id
 const getProduct = async (req ,res)=> {
   
    try{
      const { id } = req.params;
      const { userId } = req.body;
      const prod = await product.findById(id);
      const user = await User.findById(userId);
      
     const alreadyExists = await user.wishlist.some((produ)=> produ._id == id );
       if(alreadyExists){
        prod.favourite=true;
        
      }
      
      
      res.status(200).send({data : prod});
    } catch(error){
        res.status(404).json({message : error.message});
    }
}

     const favProduct = async (req ,res)=> {

       try {
        const { id } = req.params;
        const { userId } = req.body;    
        const prod  = await product.findById(id);
        const user = await User.findById(userId);
        const alreadyExists = await user.wishlist.some((produ)=> produ._id == id );
       if(alreadyExists){
       console.log('true');
        user.wishlist.remove({
            _id : id
        })
       }
       else{
        console.log("false");
        user.wishlist.push(prod)
       }
       const updatedUser = await User.findByIdAndUpdate(userId,user,{new:true});
        res.status(200).json(!alreadyExists)
       } catch (error) {
       res.status(404).json(error.message);    
       }
       
}
 const alertProduct = async (req ,res)=> {
  try {
    const { id } = req.params;
    const { userId } = req.body;    
    const prod  = await product.findById(id);
    const user = await User.findById(userId);
    const alreadyExists = await user.alerts.some((produ)=> produ._id == id );
   if(alreadyExists){
   console.log('true');
    user.alerts.remove({
        _id : id
    })
   }
   else{
    console.log("false");
    user.alerts.push(prod)
   }
   const updatedUser = await User.findByIdAndUpdate(userId,user,{new:true});
    res.status(200).json(!alreadyExists)
   } catch (error) {
   res.status(404).json(error.message);    
   }
     
}
// adding a review to a product and adding it to the array reviews in the user table
 const revProduct = async (req ,res) => {
        const { id } = req.params;  //product id
        const { value } = req.body;
        const userId = value.userId; // user id 
      
        const prod = await product.findById(id);
        // pushing the review object into product reviews
        prod.reviews.push(value);
        const user = await User.findById(userId);
        value.productName = prod.name;
        
        // pushing the review object to review array in users table 
        user.reviews.push(value);
       
        const rateing = clacAverageRating(prod.reviews) ;
        
        prod.average_rating = rateing;
        // updating product and user 
        const updatedProduct = await product.findByIdAndUpdate(id,prod,{new:true});
        const updatedUser = await User.findByIdAndUpdate(userId,user,{new:true});
        
        res.json(updatedProduct);
}
// calculating the average rating
function clacAverageRating(revis){
 const rev = revis;
var one,two,three,four,five;
one = two = three = four = five = 0;

revis.forEach(rev => {
  switch (rev.rate) {
    case 1:
      one++;
    break;
    case 2:
      two++;
    break;
    case 3:
      three++;
    break;
    case 4:
      four++;
    break;
    case 5:
      five++;
    break;
  
    default:
      break;
  }
});
  

 
 var total = one+two+three+four+five;

//the following weighted function calculates average rating
 const average_rating = (1*one+2*two+3*three+4*four+5*five)/total;
 return average_rating;
}
const productController = {
    searchProduct,
    searchCategory,
    getProduct,
    favProduct,
    revProduct,
    alertProduct,



}
export default productController