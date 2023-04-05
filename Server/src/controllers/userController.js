const User = require('../model/user');
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefeshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const refreshTokenExpiresday = 7 * 24 * 60 * 60 * 1000;
const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            mes: 'missing',
        })
    }

    const user = await User.findOne({ email });
    if (user) {
        throw new Error('User has create!')
    }
    else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please go login' : 'Something when wrong',
        })
    }


})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: 'missing',
        })
    }

    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {

        //tach password, role khoi response
        const { password, role, ...userData } = response.toObject();
        //tao access token
        const accessToken = generateAccessToken(response._id, role)
        //tao refesh token
        const refreshToken = generateRefeshToken(response._id);
        //Luu refesh token vao db
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true });
        //luu refesh token vao cookie
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: refreshTokenExpiresday })
        res.status(200).json({
            success: true,
            userData: userData,
            accessToken,
        })
    }
    else {
        throw new Error('Invalid credentials')
    }

})

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: true,
        result: user ? user : 'user not found'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie && !cookie.refreshToken) {
        throw new Error('No refresh token in cookies')
    }
    const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)



    const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken })

    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : "refresh token not match"
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) {
        throw new Error("no refesh token in cookies");
    }
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        mes: 'Logout is done'
    })
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
}