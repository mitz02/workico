const router = require("express").Router();
const JobList = require("../models/JobList")

// pOST A JOB
router.post("/postjob",async (req,res)=>{
    const{title,desc, userId} = req.body;
  const job = new JobList({
      title,
      desc, 
      userId
  })
  try {
    const newJob= await job.save();
    res.status(200).json(newJob)
  } catch (error) {
    res.status(201).json(error)
  }

})

module.exports = router;