import accountItemsModel from '../models/User.js';
import express from 'express';
const router = express.Router();

router.get('/api/items', async (req, res) => {
  try {
    const allAccountItems = await accountItemsModel.find({});
    res.status(200).json(allAccountItems)
  } catch (err) {
    res.json(err);
  }
})

router.delete('/api/item/:id', async (req, res) => {
  try {
    //find the item by its id and delete it
    const deleteItem = await accountItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Deleted');
  } catch (err) {
    res.json(err);
  }
})







export default router;

// module.exports = router;
