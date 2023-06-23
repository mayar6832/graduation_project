import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose";
import CommentsRoute from './routes/commentsItem.js';
import AccountRoute from './routes/accountsItems.js';




const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5500;

app.use(cors());


mongoose.connect("mongodb+srv://zakariayara40:suieySxjWh1SYC04@cluster0.hysfcd7.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err))

app.use("/", AccountRoute);
app.use("/", CommentsRoute);



app.listen(PORT, () => console.log("Server connected"));