const express = require('express');
const mongoose = require('mongoose');

const userSchema = require('../schemas/user');

const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');
const authMiddleware = require('../utils/authenticationMiddleware');

const router = express.Router();

router.post('/userInfo', authMiddleware, async (req, res) => {
    try {
        res.send({
            success: true,
            user: req.body.user
        });
    }
    catch (err) {
        console.log(err);
        res.send({
            success: false
        });
    }
})

router.post('/signup', async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            userType
        } = req.body;
        const hashedPassword = hashPassword(password);
        const User = mongoose.model('User', userSchema);
        await User.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            userType
        });
        res.send({
            success: true
        });
    }
    catch (err) {
        console.log(err);
        res.send({
            success: false
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const User = mongoose.model('User', userSchema);

        const user = await User.findOne({ email: email });

        if (user) {
            const x = await comparePassword(password, user.password);
            if (!x)
                res.send({
                    success: false
                });
            else {
                const x = generateToken({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    userType: user.userType
                });
                res.send({
                    success: true,
                    jwt: x
                });
            }
        }
        else {
            res.send({
                success: false
            });
        }
    }
    catch (err) {
        console.log(err);
        res.send({
            success: false
        });
    }
});

module.exports = router;