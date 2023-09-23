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
app.get('/api/match-users', async (req, res) => {
    try {
        const matchedPairs = await matchUsers();
        res.status(200).json(matchedPairs);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))