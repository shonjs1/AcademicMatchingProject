//each resource in API will have own route file.
const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController') 

router.route('/').get(getGoals).post(setGoal) //one line instead of 2 (below)
//router.get('/', getGoals)
//router.post('/', setGoal)

router.route('/:id').put(updateGoal).delete(deleteGoal) //one line instead of 2 (below)
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)


module.exports = router;