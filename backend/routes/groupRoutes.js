const express = require('express')
const router = express.Router()
const { getGroups, setGroup, } = require('../controllers/groupController')

// GROUP INFO CRUD 
router.route('/').get(getGroups).post(setGroup)



module.exports = router