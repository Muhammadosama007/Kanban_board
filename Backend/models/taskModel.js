const mongoose=require('mongoose');

const taskSchema= new mongoose.Schema({
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
        ref:'user',
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

exports.Task=mongoose.model('task',taskSchema);