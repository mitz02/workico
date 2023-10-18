const router = require("express").Router();
const Provider= require("../models/Provider");
const CryptoJs = require("crypto-js")

// Register provider
router.post("/register",async (req,res)=>{
    const{fname,state, city, img,street, lname, email, phone, skill, desc, password} = req.body;
    password = CryptoJs.AES.encrypt(password, process.env.PASSWORD_KEY).toString();
  const user = new Provider({
      fname,
      lname,
      skill,
      desc,
      phone, 
      img,
       state,
       city,
       street,
      email,
      password,
  })
  try {
    const newUser = await user.save();
    res.status(200).json(newUser)
  } catch (error) {
    res.status(201).json(error)
  }

})

module.exports = router;