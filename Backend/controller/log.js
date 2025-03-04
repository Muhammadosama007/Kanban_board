const {log}= require('../models/logModel');

const getLog=async(req,res)=>{
    const Log=await log.find();

    if(!log){
        res.status(404).json({
            message:"can't find logs!!!"
        })
    }
    else{
        res.status(200).json({
            Log,
            message:"logs successfully created"
        })
    }
}

module.exports={getLog};