const {User}=require('../models/userModel');

const create=(req,res)=>{

    const newUser=new  User(req.body);
    if(!newUser){
        res.status(404).json({
            message:"user not found!!"
        })
    }
    else{
        newUser.save();
        res.send(newUser);
    }
}

const getUser= async(req,res)=>{
    const getUser=await User.find();
    if(!getUser){
        res.status(404).json({
            message:"user not present in database!!!"
        })
    }
    else{
        res.send(getUser);
    }
}

const updateUser=async(req,res)=>{
    const updateUser= await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
console.log("updated userdata",updateUser);
    if(!updateUser){
        res.status(404).json({
            message:"cannot update user"
        })
    }
    else{
        res.send(updateUser);
    }
}

const delUser=async(req,res)=>{
    const delUser= await User.findByIdAndDelete(req.params.id);
    if(!delUser){
        res.status(404).json({
            message:"user not found to delete!!!"
        })
    }
    else{
        res.send(delUser)
    }
}


module.exports={
    create,
    getUser,
    updateUser,
    delUser
}