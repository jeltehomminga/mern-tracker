const express = require('express')
const router = express.Router()
const Excercise = require('../models/exercise.model')

router.get('/', (req, res) => {
  Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/add', (req, res, next) => {
  const username = req.body.username
  const description = req.body.description
  const duration = Number(req.body.duration)
  const date = Date.parse(req.body.date)

  const newExcercise = new Excercise({ username, description, duration, date })

  newExcercise
    .save()
    .then(() => res.json('Excercise added!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.get('/:id', (req, res) => {
  Excercise.findById(req.params.id)
    .then(excercise => res.json(excercise))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.delete('/:id', (req, res) => {
  Excercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('exercise deleted'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/update/:id', (req, res) => {
  const update = {
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date)
  }
  Excercise.findByIdAndUpdate(req.params.id, update)
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router
