const mongoose  = require("mongoose")

const JobListSchema = mongoose.Schema({
    title:{type:String, required:true},
    desc:{type:String, required:true},
    userId:{type:String, required:true},
}, {timestamps:true});


module.exports =  mongoose.model("JobList", JobListSchema);