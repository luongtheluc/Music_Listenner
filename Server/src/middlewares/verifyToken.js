const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler')

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const reqHeader = req.headers.authorization;
        const token = reqHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    mes: 'Invalid access token'
                })
            }
            req.user = decode;
            next()
        })
    }
    else {
        return res.status(401).json({
            success: false,
            mes: 'Require authentication'
        })
    }
})

module.exports = {
    verifyAccessToken,
}