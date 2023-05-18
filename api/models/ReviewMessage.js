import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({
    rate:{
        type:Number,
        
    },
    Comment:String,

})
// const reviewMessage = mongoose.model('reviewMessage',reviewSchema);
export default reviewSchema;