// import
//loads .env fies contents into process.env
require('dotenv').config()
const express = require ('express')
const cors = require('cors')
const router = require('./routing/router')
require('./db/connection')
// create server
const bookstoreServer = express()
// enable cors protocol in server app
bookstoreServer.use(cors())
bookstoreServer.use(express.json()) //parse jsom
bookstoreServer.use(router)
bookstoreServer.use('/uploads',express.static('./uploads'))
// create port 
const PORT = 3000

// RUN SERVER IN PORT
bookstoreServer.listen(PORT,()=>{
    console.log(`BookStore Server starts at PORT :${PORT},and waiting for client request...!!!`);
    
})

// resolving http request
 bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:green;">BookStore Server starts.....and waiting for client request...!!!</h1>`)
 })

