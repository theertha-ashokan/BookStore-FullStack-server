const books = require('../models/bookModel')

// add book
exports.addBookController = async(req,res)=>{
    console.log("Inside addBookController");
    res.status(200).json("request recieved")
    
}