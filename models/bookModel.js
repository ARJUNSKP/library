const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    publishedYear:{
        type:String,
        required:true
    }
})
const books=mongoose.model("books",bookSchema)

module.exports=books