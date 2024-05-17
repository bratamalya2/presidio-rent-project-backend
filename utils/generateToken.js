const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(data, jwtSecretKey, {
        expiresIn: '1h',
    });
    return token;
};

module.exports = generateToken;