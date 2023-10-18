const mongoose  = require("mongoose")

const UserSchema = mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    phone:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String},
    isAdmin:{type:Boolean, default:false},
    district: {type:String},
    img:{type:String},
     password:{type:String, required:true},
   

}, {timestamps:true});


module.exports =  mongoose.model("User", UserSchema);