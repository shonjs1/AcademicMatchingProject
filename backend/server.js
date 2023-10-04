const express = require('express') //bring express in
const colors = require('colors') 
const dotenv = require('dotenv').config() //have environment variables 
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const app = express() //initialize express

connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/subjects', require('./routes/subjectRoutes'))
app.use('/api/accounts', require('./routes/accountRoutes'))
app.use('/api/groups', require('./routes/groupRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))