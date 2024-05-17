const express = require('express');
const mongoose = require('mongoose');

const propertySchema = require('../schemas/property');
const buyerSchema = require('../schemas/buyer');

const authMiddleware = require('../utils/authenticationMiddleware');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'buyer')
            res.send({
                success: false
            });
        else {
            const Property = mongoose.model('Property', propertySchema);
            const x = await Property.find();
            res.send({
                success: true,
                properties: x
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

router.get('/getAllLikedProperties', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'buyer')
            res.send({
                success: false
            });
        else {
            const Buyer = mongoose.model('Buyer', buyerSchema);
            const buyer = await Buyer.findOne({
                buyerEmail: req.body.user.email
            });
            if (!buyer) {
                res.send({
                    likedPropertIds: []
                });
            }
            else {
                res.send({
                    success: true,
                    likedPropertIds: buyer.likedPropertIds
                });
            }
        }
    }
    catch (err) {
        console.log(err);
        res.send({
            success: false
        });
    }
});

router.post('/like', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'buyer')
            res.send({
                success: false
            });
        else {
            const Buyer = mongoose.model('Buyer', buyerSchema);

            const buyer = await Buyer.findOne({
                buyerEmail: req.body.user.email
            });
            if (!buyer) {
                await Buyer.create({
                    buyerEmail: req.body.user.email,
                    likedPropertIds: [req.body.propertyId]
                });
            }
            else {
                await Buyer.findOneAndUpdate({
                    buyerEmail: req.body.user.email
                },
                    {
                        likedPropertIds: [...buyer.likedPropertIds, req.body.propertyId]
                    });
            }
            res.send({
                success: true
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