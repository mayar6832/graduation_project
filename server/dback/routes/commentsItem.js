import commentsItemsModel from '../models/commentsItem.js';
import express from 'express';
const router = express.Router();


router.get('/api/comments', async (req, res) => {
  try {
    const allAccountItems = (await commentsItemsModel.find({
      $expr: {
        $gt: [{ $size: "$reviews" }, 0]
      }
    }));    // reviews: { $exists: true }
    res.status(200).json(allAccountItems)
  } catch (err) {
    res.json(err);
  }
})


router.post('/api/comments/:id', async (req, res) => {
  try {
    const { pID } = req.body;
    console.log(pID);
    //find the item by its id and delete it
    const deleteItem = await commentsItemsModel.updateOne({ "_id": pID }, { $pull: { "reviews": { "_id": req.params.id } } });
    const allAccountItems = (await commentsItemsModel.find({
      $expr: {
        $gt: [{ $size: "$reviews" }, 0]
      }
    }));
    res.status(200).json(allAccountItems);
  } catch (err) {
    res.json(err);
  }
})



export default router;