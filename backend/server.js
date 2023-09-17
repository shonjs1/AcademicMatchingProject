const express = require('express') //bring express in
const dotenv = require('dotenv').config() //have environment variables 
const port = process.env.PORT || 5000

const app = express() //initialize express

app.listen(port, () => console.log(`Server started on port ${port}`))