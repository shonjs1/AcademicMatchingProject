const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Test:1111@cluster0.icutero.mongodb.net/mernapp")

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline );
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB