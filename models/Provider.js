const mongoose  = require("mongoose")

const ProviderSchema = mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
     skill:{type:Array, required:true},
    desc:{type:String, required:true},
    state:{type:String, required:true},
    city:{type:String, required:true},
    img:{type:String, required:true},
    phone:{type:String, required:true},
    email:{type:String, required:true, unique:true},
     password:{type:String, required:true},
   

}, {timestamps:true});


module.exports =  mongoose.model("Provider", ProviderSchema);