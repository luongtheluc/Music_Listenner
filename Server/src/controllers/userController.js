const User = require('../model/user');
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefeshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../utils/sendmail')
const crytojs = require('crypto')

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
        const { password, role, refreshToken, ...userData } = response.toObject();
        //tao access token
        const accessToken = generateAccessToken(response._id, role)
        //tao refesh token
        const newRefreshToken = generateRefeshToken(response._id);
        //Luu refesh token vao db
        await User.findByIdAndUpdate(response._id, { newRefreshToken }, { new: true });
        //luu refesh token vao cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: refreshTokenExpiresday })
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
        success: user ? true : false,
        result: user ? user : 'user not found'
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query;
    if (!_id) {
        throw new Error("Missing ")
    }
    const response = await User.findByIdAndDelete(_id);
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted` : 'no user deleted'
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0) {
        throw new Error("Missing ")
    }
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something when wrong!'
    })
})

const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params;
    if (Object.keys(req.body).length === 0) {
        throw new Error("Missing input")
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role');
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response : 'Something when wrong!'
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

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) {
        throw new Error("Missing email")
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Invalid email, user not found");
    }
    const resetToken = user.createPasswordChangeToken()
    console.log(resetToken)
    await user.save();

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu.
         Link này sẽ hết hạn sau 15' kể từ bây giờ 
         <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>CLICK HERE</a>`;
    const data = {
        email: email,
        html
    }

    const result = await sendEmail(data)
    return res.status(200).json({
        success: true,
        result
    })

})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) {
        throw new Error("Missing input")
    }

    const passwordResetToken = crytojs.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        throw new Error("Invalid reset token")
    }
    user.password = password
    user.passwordResetToken = undefined;
    user.passwordChangeAt = Date.now();
    user.passwordResetExpires = undefined;
    await user.save();
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something when wrong'
    })
})

const getAllusers = asyncHandler(async (req, res) => {
    const response = await User.find().select('-refreshToken -password -role');
    return res.status(200).json({
        success: response ? true : false,
        user: response
    })
})


module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getAllusers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
}