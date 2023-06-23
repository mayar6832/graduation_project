import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    rate: {
        type: Number,
        default: 0,
    },
    Comment: String,
    date: Date,
    userName: String,
    userImage: String,
    userId: String,
    productName: String,

})



export default reviewSchema;