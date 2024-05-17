const mongoose = require('mongoose');

async function connectDB() {
    try {
        const password = process.env.DB_PASSWORD;
        const conn = await mongoose.connect(`mongodb+srv://bratamalya2:${password}@cluster0.a6v81ie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;