//each resource in API will have own route file.
const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.status(200).json({message: 'Get goals'})
})

router.post('/', (req, res) =>{ //Create goal
    res.status(200).json({message: 'Set goals'})
})

router.put('/:id', (req, res) =>{ //needs ID**
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

router.delete('/:id', (req, res) =>{ //needs ID**
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})


module.exports = router