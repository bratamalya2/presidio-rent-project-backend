const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    userType: String
});

module.exports = userSchema;