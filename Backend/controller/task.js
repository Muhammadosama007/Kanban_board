const {Task}=require('../models/taskModel');

const create=(req,res)=>{
    const newTask= new Task(req.body);

    if(!newTask){
        res.status(404).json({
            message:"can't add new task!!!"
        })
    }
    else{
        newTask.save();
        res.send(newTask);
    }
}
const getTask= async(req,res)=>{
    const getTask= await Task.find().populate('userId');
    if(!getTask){
        res.status(404).send({
            message:"cant get Tasks!!!"
        })
    }
    else{
        res.send(getTask);
    }
}
const updateTask= async(req,res)=>{
    const updateTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updateTask){
        res.status(404).send({
            message:"cant Update Task!!!"
        }) 
    }
    else{
        updateTask.save();
        res.send(updateTask);
    }
}

const delTask= async(req,res)=>{
    const delTask=await Task.findByIdAndDelete(req.params.id);
    if(!delTask){
        res.status(404).send({
            message:"cant delete Task!!!"
        }) 
    }
    else{
        res.send(delTask);
    }
}

module.exports={
    create,
    getTask,
    updateTask,
    delTask
}