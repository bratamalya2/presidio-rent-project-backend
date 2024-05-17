const mongoose = require('mongoose');
const { Schema } = mongoose;

const buyerSchema = new Schema({
    buyerEmail: String,
    likedPropertIds: [String]
});

module.exports = buyerSchema;