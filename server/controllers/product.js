import { spawn } from 'child_process';
import product from '../models/products.js';
import User from '../models/User.js';
//search product 
const searchProduct = async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 25;
    const skip = (page - 1) * limit;
    const search = req.body.search || "";
    const maxPrice = req.body.maxPrice || 100000;
    const minPrice = req.body.minPrice || 0;
    const filters = [];
    if (req.body.search) {
      filters.push({
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            categoryName: { $regex: ".*" + search + ".*", $options: "i" },
          },
        ],
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
    let product_data = await product
      .find({
        $and: filters,
      })
      .skip(skip)
      .limit(limit);
    const query = await product.find({
      $and: filters,
    });
    product_data = filterCheapestProducts(product_data);
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
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const prod = await product.findById(id);
    const user = await User.findById(userId);
    const prodName = prod.name;

    const alreadyExists = await user.wishlist.some((produ) => produ._id == id);
    if (alreadyExists) {
      prod.favourite = true;
    }

    const alreadyExAlerts = await user.alerts.some((produ) => produ._id == id);
    if (alreadyExAlerts) {
      prod.alert = true;
    }

    if (prod.recommendations.length == 5) {
      const recs = await getProductsByName(prod.recommendations)

      res.status(200).json({ data: prod, recommended: recs });
    } else {
      // this is the link for python excutable  
      const pythonExecutable = '/home/akram/anaconda3/bin/python3';
      const pythonScript = './controllers/recommendation.py';
      const args = [prodName, prod.categoryName];

      const pythonProcess = spawn(pythonExecutable, [pythonScript, ...args]);

      let recommendations = [];

      // Handle the output from the Python script
      pythonProcess.stdout.on('data', (data) => {

        recommendations = data.toString().trim().split('\n'); // Convert the output to an array of strings
      });

      // Handle errors that occur during the execution of the Python script
      pythonProcess.on('error', (error) => {
        console.error(`Error executing the Python script: ${error.message}`);
        res.status(500).json({ message: 'Error executing the Python script' });
      });

      // Handle the end of the Python script execution
      pythonProcess.on('close', async (code) => {
        if (code === 0) {
          // Python script executed successfully
          console.log('Python script execution completed');
          recommendations = JSON.parse(recommendations);
          // console.log(recommendations);
          prod.recommendations = recommendations; // Update the recommendations in the product
          // console.log(recommendations);


          try {
            const updatedProduct = await product.findByIdAndUpdate(id, prod, { new: true });
            const recs = await getProductsByName(prod.recommendations)
            // console.log(recs)

            res.status(200).send({ data: updatedProduct, recommended: recs });
          } catch (error) {
            console.error('Error saving updated product:', error);
            res.status(500).json({ message: 'Failed to save updated product' });
          }
        } else {
          // Error occurred in the Python script
          console.error(`Python script execution failed with code ${code}`);
          res.status(500).json({ message: 'Python script execution failed' });
        }
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};


const favProduct = async (req, res) => {

  try {
    const { id } = req.params;
    const { userId } = req.body;
    const prod = await product.findById(id);
    const user = await User.findById(userId);
    const alreadyExists = await user.wishlist.some((produ) => produ._id == id);
    if (alreadyExists) {
      console.log('true');
      user.wishlist.remove({
        _id: id
      })
    }
    else {
      console.log("false");
      user.wishlist.push(prod)
    }
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json(!alreadyExists)
  } catch (error) {
    res.status(404).json(error.message);
  }

}
const alertProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const prod = await product.findById(id);
    const user = await User.findById(userId);
    const alreadyExists = await user.alerts.some((produ) => produ._id == id);
    if (alreadyExists) {
      console.log('true');
      user.alerts.remove({
        _id: id
      })
    }
    else {

      user.alerts.push(prod)

    }
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    //  console.log(updatedUser.alerts);
    res.status(200).json(!alreadyExists)
  } catch (error) {

    res.status(404).json(error.message);
  }

}
// adding a review to a product and adding it to the array reviews in the user table
const revProduct = async (req, res) => {
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
  if (user.reviews.length == 10) {
    user.notifications.push('you have received a sale coupon');
    console.log(user.notifications);
  }
  const rateing = clacAverageRating(prod.reviews);

  prod.average_rating = rateing;
  // updating product and user 
  const updatedProduct = await product.findByIdAndUpdate(id, prod, { new: true });
  const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });

  res.json(updatedProduct);
}
// calculating the average rating
function clacAverageRating(revis) {
  const rev = revis;
  var one, two, three, four, five;
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



  var total = one + two + three + four + five;

  //the following weighted function calculates average rating
  const average_rating = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / total;
  return average_rating;
}
async function getProductsByName(names) {
  const products = [];


  for (const name of names) {
    const prod = await product.find({
      "name": name
    })
    products.push(prod);
  }

  return products;
}
function filterCheapestProducts(products) {

  const cheapestProducts = [];

  products.forEach((product) => {
    // check if product is already in productsWithLowestPrice by checking the name of the product 
    if (!cheapestProducts.find((p) => p.name === product.name)) {
      console.log('product not found in cheapest products');
      cheapestProducts.push(product);
      return;
    };

    for (let i = 0; i < cheapestProducts.length; i++) {
      const cheapestProduct = cheapestProducts[i];

      if (!(product.name === cheapestProduct.name)) {
        console.log('product name not equal cheapest product name');
        return;
      }

      if (product.price < cheapestProduct.price) {
        console.log('cheaper product found');
        cheapestProducts[i] = product;
      }

    }
  });
  return cheapestProducts;
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