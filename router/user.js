
const User = require("../models/User");
const {verifyTokenAndAuthorization, verifyTokenAndAmin} = require("./verifyToken");
const router =require("express").Router();
const CryptoJs = require("crypto-js")

// update user
router.put("/:id", verifyTokenAndAuthorization,async (req,res)=>{
 if(req.body.password){
    req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASSWORD_KEY).toString();
 }
   
 try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, {new:true});
      res.status(200).json(updatedUser)
      
 } catch (error) {
      res.status(500).json("error")
 }


})

// DELETE User

router.delete("/delete/:id",verifyTokenAndAuthorization, async (req,res)=>{
try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user deleted !")
} catch (error) {
    res.status(500).json(error)
    
}
})

// GET USER
router.get("/:id",verifyTokenAndAmin, async (req,res)=>{
    try {
         const user =  await User.findById(req.params.id)
         !user &&  res.status(401).json("user not found");
         const{password, ...others} = user._doc;
         res.status(200).json(others);
    
    } catch (error) {
        res.status(500).json(error)
        
    }
    })

// GET ALL USERS
router.get("/",verifyTokenAndAmin, async (req,res)=>{
    const query = req.query.new;
    
    try {
         const users=  query ? await User.find().sort({_id:-1}).limit(5) :await User.find();
         res.status(200).json(users);
    
    } catch (error) {
        res.status(500).json(error)
        
    }
})


// GET USERS STATISTICS
router.get("/stats", (verifyTokenAndAmin, async (req, res)=>{
    const date  = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
   
    try {
        const data = await User.aggregate([
            {$match: {
                createdAt: {
                    $gte: lastYear
                },
              }},
        
              {
                $project:{
                    month: {$month:"$createdAt"},
     
                },
              },
              {
              $group:{
                _id: "$month",
                total: {$sum:1},
              }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
       res.status(401).json(errpr); 
    }
}))


module.exports = router;