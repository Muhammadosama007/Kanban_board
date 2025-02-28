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
        ref:'User',
        required:false
    }
})

exports.Task=mongoose.model('Task',taskSchema);