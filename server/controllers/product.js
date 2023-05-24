import product from '../models/products.js'
//search product 
const searchProduct = async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const limit = 25;
        const skip = (page - 1) * limit;
        const search = req.body.search || "";
        const maxPrice = req.body.maxPrice || 100000;
        const minPrice = req.body.minPrice || 0;
        const filters = [];
        if (req.body.search) {
            filters.push({ "name": { $regex: ".*" + search + ".*", $options: 'i' } })
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
const productController = {
    searchProduct,
    searchCategory
}
export default productController