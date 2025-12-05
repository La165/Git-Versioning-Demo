

const express = require("express");

const cors = require("cors");

const { default: mongoose } = require("mongoose");
const router = require("./routes");


const app=express();
app.use(cors());
app.use(express.json());

const MONGO_URL = "mongodb+srv://jlalitha2001_db_user:T16IiZd4DjZALZJs@cluster0.syvbtjd.mongodb.net/?appName=Cluster0";



mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));



app.listen(6001, ()=>
{
    console.log("server is running on 6001");
});

app.use("/api/v1/products",router);