const express = require('express') //bring express in
const colors = require('colors') 
const dotenv = require('dotenv').config() //have environment variables 
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express() //initialize express

connectDB()
app.use('/api/goals', require('./routes/goalRoutes'))

app.listen(port, () => console.log(`Server started on port ${port}`))