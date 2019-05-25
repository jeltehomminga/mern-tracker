const express = require('express')
const router = express.Router()
const Excercise = require('../models/exercise.model')

router.get('/', (req, res) => {
  Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/add', (req, res, next) => {
  const newExcercise = new Excercise({ username, description, duration, date })

  newExcercise
    .save()
    .then(() => res.json('Excercise added!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router
