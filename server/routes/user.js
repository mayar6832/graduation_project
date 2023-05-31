import express from "express";
import { getUser, updateUser , getUserReviews,getUserWishlist,deleteWishListItem} from "../controllers/user.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.put("/update", upload.single("picture"), updateUser);
router.get("/:_id", getUser);
router.get("/:id/reviews", getUserReviews);
router.get('/:id/wish',getUserWishlist);
router.put('/:id/wish',deleteWishListItem);

export default router;