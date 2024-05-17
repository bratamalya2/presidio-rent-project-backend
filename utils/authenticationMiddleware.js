const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    try {
        const decoded = jwt.verify(req.body.jwtToken, process.env.JWT_SECRET_KEY);
        req.body.user = {
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
            phone: decoded.phone,
            userType: decoded.userType
        };
        next();
    }
    catch (err) {
        res.send({
            success: false
        });
    }
}

module.exports = authMiddleware;