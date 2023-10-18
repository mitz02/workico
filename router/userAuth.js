const router = require("express").Router();
const User = require("../models/User")
const CryptoJs = require("crypto-js")

const jwt = require("jsonwebtoken")

// Register user
router.post("/",async (req,res)=>{
    const{fname,state, city, img,district, lname, email, phone,  password, isAdmin} = req.body;
  //  password = CryptoJs.AES.encrypt(password, "smdsms,md").toString();
  
  const user = new User({
      fname,
      lname,
      email,
      phone,
       state,
       city,
       district,
      img,
      isAdmin,
      password:CryptoJs.AES.encrypt(password, process.env.PASSWORD_KEY).toString(),
  })
  try {
    const newUser = await user.save();
    res.status(200).json(newUser)
  } catch (error) {
    res.status(201).json(error)
  }

})


// login user
router.post("/login", async(req,res)=>{
 try {
    const user = await User.findOne({email:req.body.email});
     !user && res.status(401).json("wrong credentials");
     const decrypt = CryptoJs.AES.decrypt(user.password, process.env.PASSWORD_KEY).toString(CryptoJs.enc.Utf8);
     decrypt !== req.body.password && res.status(40).json("incorrect password");

     const accessToken = jwt.sign({
      id:user.id,
      isAdmin:user.isAdmin
     }, process.env.JWT_SEC, {expiresIn:"3d"})

    const{password, ...others} = user._doc;
    res.status(200).json({...others, accessToken})
 } catch (error) {
    res.status(500).json(error)
 }
})  

module.exports = router;