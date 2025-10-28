const express = require('express')
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulterMiddleware')
const adminJwtMiddleware = require('../middlewares/adminJwtMiddleware')
const router = express.Router()


// -----------------------------unauthorised user--------------------------------------------------------
// register 
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google-login',userController.googleLoginController)

// add books
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),bookController.addBookController)

// home books
router.get('/home-books',bookController.getHomeBooks)

// --------------------------------------Authorized user--------------------------------------------------------

// all books
router.get('/all-books',jwtMiddleware,bookController.getAllBooks)

// view-books
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)

// get user books
router.get('/user-books',jwtMiddleware,bookController.getAllUserBooksController)

// get user bought books
router.get('/user-bought-books',jwtMiddleware,bookController.getAllUserBoughtBooksController)

// delete user books
router.delete('/user-books/:id/remove',jwtMiddleware,bookController.deleteUserBookController)

// user profile update
router.put('/user-profile/edit',jwtMiddleware,multerConfig.single('profile'),userController.userProfileEditController)

//--------------------------------Authorised-Admin-------------------------------------------------------------------

// all user lis
router.get('/all-user',adminJwtMiddleware,userController.getAllUserController)

// all book list
router.get('/admin-all-books',adminJwtMiddleware,bookController.getAllBooksAdminController)

// approve book
router.put('/admin/book/approve',adminJwtMiddleware,bookController.updateBookStatusController)

module.exports = router