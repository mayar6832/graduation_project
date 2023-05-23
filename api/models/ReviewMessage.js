import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
    rate:{
        type:Number,
        default:0,
    },
    Comment:String,
    date: Date,

})
// const reviewMessage = mongoose.model('reviewMessage',reviewSchema);
export default reviewSchema;