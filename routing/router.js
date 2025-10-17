const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulterMiddleware')
const router = express.Router()

// register 
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)

// Google login
router.post('/google-login',userController.googleLoginController) 

// add book
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImges',3),bookController.addBookController) 


module.exports = router