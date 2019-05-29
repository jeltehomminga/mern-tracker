const express = require('express')
const path = require("path");
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const connection = mongoose.connection

connection.once('open', () => console.log('MongoDB connected'))

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.use(express.static(path.join(__dirname, "public/build")));


app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/build/index.html");
});

app.listen(port, () => console.log(`port running on ${port}`))
