const mongoose=require('mongoose');

const logSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    stat:{
        type:String,
        enum:['Todo','In-progress','Done'],
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:false
    },
    logs:[
        {
            changedBy:{ 
                type:mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            previousStatus:{
                type:String
            },
            newStatus:{
                type:String
            },
            time:{
                type:Date,
                default:Date.now
            }
        }
    ]
})

exports.log=mongoose.model('log',logSchema);