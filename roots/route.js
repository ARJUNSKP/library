const express=require('express')
const LogicPath=require('../controler/logic')

const router=express.Router()
router.post('/express/new/admin',LogicPath.adminReg)
router.post('/express/admin/login',LogicPath.adminLogin)
router.post('/express/new/user',LogicPath.userReg)
router.post('/express/user/login',LogicPath.userLogin)
router.post('/express/user/password/update/:email',LogicPath.userPswReset)
router.post('/express/book/create/:aid',LogicPath.createBook)
router.post('/express/book/update/:bid',LogicPath.bookUpdate)
router.get('/express/book/books',LogicPath.bookList)
router.delete('/express/delete/book/:aid',LogicPath.deleteBook)
router.get('/express/delete/book/search',LogicPath.searchCatogory)

module.exports=router