const express=require('express')
require('dotenv').config()
require('./connection/db')
const router=require('./roots/route')
const cors=require('cors')
const server=express()
server.use(cors())
server.use(express.json())
server.use(router)
server.use('/upload',express.static('./uploads'))
const port = 5000 || process.env.port
server.listen(port,()=>{
    console.log(`---server is running ${port} in this port`)
})