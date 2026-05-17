const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Store = require("./models/Store");
const Rating = require("./models/Rating");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

  console.log("Database Connected Successfully");

})
.catch((error)=>{

  console.log(error);

});


// =========================
// REGISTER
// =========================

app.post("/api/auth/register", async(req,res)=>{

  try{

    const {

      name,
      email,
      address,
      password

    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        message:"User Already Exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password,10);

    const newUser = new User({

      name,
      email,
      address,
      password:hashedPassword

    });

    await newUser.save();

    res.json({

      message:"User Registered Successfully"

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});


// =========================
// LOGIN
// =========================

app.post("/api/auth/login", async(req,res)=>{

  try{

    const {

      email,
      password

    } = req.body;

    const user =
      await User.findOne({ email });

    if(!user){

      return res.status(400).json({
        message:"Invalid Credentials"
      });

    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if(!isMatch){

      return res.status(400).json({
        message:"Invalid Credentials"
      });

    }

    const token =
      jwt.sign(

        {
          id:user._id
        },

        process.env.JWT_SECRET,

        {
          expiresIn:"7d"
        }

      );

    res.json({

      token,

      user:{

        id:user._id,
        name:user.name,
        email:user.email

      }

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});


// =========================
// ADD STORE
// =========================

app.post("/api/stores/add", async(req,res)=>{

  try{

    const {

      name,
      email,
      address,
      image

    } = req.body;

    const newStore = new Store({

      name,
      email,
      address,
      image

    });

    await newStore.save();

    res.json({

      message:"Store Added Successfully"

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});


// =========================
// GET STORES
// =========================

app.get("/api/stores", async(req,res)=>{

  try{

    const stores =
      await Store.find();

    res.json(stores);

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});


// =========================
// ADD RATING
// =========================

app.post("/api/ratings/add", async(req,res)=>{

  try{

    const {

      userId,
      storeId,
      value

    } = req.body;

    const newRating = new Rating({

      userId,
      storeId,
      value

    });

    await newRating.save();

    res.json({

      message:"Rating Added Successfully"

    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message:"Server Error"
    });

  }

});


app.listen(5000,()=>{

  console.log("Server Running on Port 5000");

});