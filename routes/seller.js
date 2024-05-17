const express = require('express');
const mongoose = require('mongoose');

const propertySchema = require('../schemas/property');

const authMiddleware = require('../utils/authenticationMiddleware');

const router = express.Router();

router.post('/new', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'seller')
            res.send({
                success: false
            });
        else {
            const Property = mongoose.model('Property', propertySchema);
            await Property.create({
                sellerEmail: req.body.user.email,
                city: req.body.city,
                area: req.body.area,
                numberOfBedrooms: req.body.numberOfBedrooms,
                numberofBathrooms: req.body.numberofBathrooms,
                nearbyHospitals: JSON.parse(req.body.nearbyHospitals),
                nearbyColleges: JSON.parse(req.body.nearbyColleges)
            });
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

router.post('/', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'seller')
            res.send({
                success: false
            });
        else {
            const Property = mongoose.model('Property', propertySchema);
            const x = await Property.find({
                sellerEmail: req.body.user.email
            });
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

router.delete('/remove', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'seller')
            res.send({
                success: false
            });
        else {
            const Property = mongoose.model('Property', propertySchema);
            await Property.deleteOne({
                sellerEmail: req.body.user.email,
                _id: req.body._id
            });
            res.send({
                success: true,
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

router.post('/modify', authMiddleware, async (req, res) => {
    try {
        if (req.body.user.userType !== 'seller')
            res.send({
                success: false
            });
        else {
            const Property = mongoose.model('Property', propertySchema);
            const x = await Property.findOne({
                sellerEmail: req.body.user.email,
                _id: req.body._id
            });
            await Property.findOneAndUpdate({
                sellerEmail: req.body.user.email,
                _id: req.body._id
            }, {
                sellerEmail: req.body.user.email,
                city: req.body.newProperty.city,
                area: req.body.newProperty.area,
                numberOfBedrooms: req.body.newProperty.numberOfBedrooms,
                numberofBathrooms: req.body.newProperty.numberofBathrooms,
                nearbyHospitals: JSON.parse(req.body.newProperty.nearbyHospitals),
                nearbyColleges: JSON.parse(req.body.newProperty.nearbyColleges)
            });
            res.send({
                success: true,
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