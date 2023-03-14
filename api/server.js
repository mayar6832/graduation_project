const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/products',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=> console.log('connected to DB'))
.catch(console.error)

PORT = 4000;
app.listen(PORT,()=>console.log(`Server started on port:${PORT}`))