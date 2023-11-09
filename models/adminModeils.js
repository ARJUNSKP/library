const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    psw:{
        type:String,
        required:true
    }
})
const admins=new mongoose.model("admins",adminSchema)

module.exports=admins