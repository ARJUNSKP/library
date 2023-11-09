const admins=require('../models/adminModeils')
const users=require('../models/userModeil')
const books=require('../models/bookModel')


// *** Admin creating ***
const adminReg=async(req,res)=>{
    const {email,psw}=req.body
    if(!email || !psw){
        res.status(400).json("email and psw required")
    }else{
        try{
            const Response =await admins.findOne({email})
            if(Response){
                res.status(400).json("admin is exist")
            }else{
                var newAdmin=new admins({
                    email,
                    psw
                }) 
                await newAdmin.save()
                res.status(200).json(email)
            }
        }catch{
            res.status(400).json("connection error")

        }
    }
}
const adminLogin=async(req,res)=>{
    const {email,psw}=req.body
    if(!email || !psw){
        res.status(400).json("email and psw are required")
    }else{
        try{
                const admin = await admins.findOne({email,psw})
                if(admin){
                    res.status(200).json(admin.email)
                }else{
                    res.status(400).json("UserName or Password invalid")
                }
            }
        catch{
            res.status(400).json("connection error")
        }
    }
}
// *** user creating ***
const userReg=async(req,res)=>{
    const {email,psw}=req.body
    if(!email || !psw){
        res.status(400).json("email and psw required")
    }else{
        try{
            const user =await users.findOne({email})
            if(user){
                res.status(400).json("admin is exist")
            }else{
                var newUser=new users({
                    email,
                    psw
                }) 
                await newUser.save()
                res.status(200).json(email)
            }
        }catch{
            res.status(400).json("connection error")

        }
    }
}
const userLogin=async(req,res)=>{
    const {email,psw}=req.body
    if(!email || !psw){
        res.status(400).json("email and psw are required")
    }else{
        try{
                const user = await users.findOne({email,psw})
                if(user){
                    res.status(200).json(user.email)
                }else{
                    res.status(400).json("UserName or Password invalid")
                }
            }
        catch{
            res.status(400).json("connection error")
        }
    }
}

// *** password updating user
const userPswReset=async(req,res)=>{
    const {email}=req.params
    const {psw}=req.body
    if(!email){
        res.status(400).json("email-Id is required")
    }else{
        try{
            const user = await users.findOne({email})
            if(user){
                user.psw=psw
                await user.save()
                res.status(200).json("password is updated")
            }else{
                res.status(400).json("user not found")
            }
        }catch{
            res.status(400).json("connection error")
        }
    }
}
// *** book creating *****

const createBook=async(req,res)=>{
    const {aid}=req.params
    const {name,author,title,category,publishedYear}=req.body
    if(!name || !author || !title || !category || !publishedYear){
        res.status(400).json(" All field are Required")
    }else{
        try{
            const admin=await admins.findOne({_id:aid})
            if(admin){
                books.create({name,author,title,category,publishedYear}).then(book=>{
                    if(book){
                        res.status(200).json(`${book.name} is registread`)
                    }
                })
            }else{
                res.status(400).json("not create book")
            }
        }catch{
            res.status(400).json("connection error")
        }
    }
}

// *** Edit Book ***
const bookUpdate=async(req,res)=>{
    const {bid}=req.params
    const {name,author,title,category,publishedYear}=req.body

    if(!name || !author || !title || !category || !publishedYear){
        res.status(400).json(" All field are Required")
    }else{
        try{
            const book = await books.findOne({_id:bid})
            if(book){
                book.name=name,
                book.author=author,
                book.title=title,
                book.category=category,
                book.publishedYear=publishedYear

                await book.save()
                res.status(200).json(`${book.name} is updated`)
            }

        }catch{
            res.status(400).json("Connection error")
        }
    }
}

// book list ***
const bookList=async(req,res)=>{
    const book = await books.find()
    if(book){
        res.status(200).json(book)
    }else{
        res.status(400).json("empty book")
    }
}

const deleteBook=async(req,res)=>{
    const {aid}=req.params
    const {bid}=req.body
    if(!aid || !bid){
        res.status(400).json(" all field are required")
    }else{
        try{
            const admin = await admins.findOne({_id:aid})
            if(admin){
                const book = await books.findByIdAndDelete({_id:bid})
                if(book){
                    res.status(200).json(`book deleted`)
                }else{
                    res.status(400).json("not find book")
                }
            }else{
                res.status(400).json("user not Delete book")
            }
        }catch{
            res.status(400).json("connection error")
        }
    }
}
const searchCatogory=async(req,res)=>{
    const {name,author,publishedYear}=req.body
    if(name){
        const book= await books.find({name})
        if(book){
            res.status(200).json(book)
        }else{
            res.status(400).json("book not found")
        }
    }
    else if(author){
        const book=await books.find({author})
        if(book){
            res.status(200).json(book)
        }else{
            res.status(400).json("book not found")
        }
    }
    else if(publishedYear){
        const book=await books.find({publishedYear})
        if(book){
            res.status(200).json(book)
        }else{
            res.status(400).json("book not found")
        }
    }
    else{
        res.status(400).json("invalid search")
    }
}


module.exports={
    adminReg,
    adminLogin,
    userReg,
    userLogin,
    userPswReset,
    createBook,
    bookUpdate,
    bookList,
    deleteBook,
    searchCatogory
}