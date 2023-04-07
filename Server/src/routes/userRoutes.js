const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post('/register', userController.register)
router.post('/login', userController.login);
router.get('/current', verifyAccessToken, userController.getCurrent);
router.get('/logout', userController.logout);
router.get('/forgotpassword', userController.forgotPassword);
router.post('/refreshtoken', userController.refreshAccessToken);
router.put('/resetpassword', userController.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], userController.getAllusers)
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUser)
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin)
router.put('/current', [verifyAccessToken], userController.updateUser)

module.exports = router