const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
    sellerEmail: String,
    city: String,
    area: String,
    numberOfBedrooms: Number,
    numberofBathrooms: Number,
    nearbyHospitals: [String],
    nearbyColleges: [String]
});

module.exports = propertySchema;