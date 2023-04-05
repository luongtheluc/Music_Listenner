const router = require('express').Router()
const userController = require('../controllers/userController')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', userController.register)
router.post('/login', userController.login);
router.get('/current', verifyAccessToken, userController.getCurrent);
router.get('/logout', userController.logout);
router.post('/refreshtoken', userController.refreshAccessToken);




module.exports = router