import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EditExercise = ({ match }) => {
  const inputEl = useRef(null)
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])
  useEffect(() => {
    debugger
    axios
      .get(`http://localhost:5000/exercises/${match.params.id}`)
      .then(res => {
        debugger
        setUsername(res.data.username)
        setDescription(res.data.description)
        setDuration(res.data.duration)
        setDate(new Date(res.data.date))
      })
      .catch(err => console.log(err))
  }, [match.params.id])
  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username))
          setUsername(res.data[0].username)
        }
      })
      .catch(err => console.log(err))
  }, [])
  const onSubmit = e => {
    e.preventDefault()
    const exercise = { username, description, duration, date }
    console.log(exercise)
    axios
      .post(
        `http://localhost:5000/exercises/update/${match.params.id}`,
        exercise
      )
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    setUsername('')
    window.location = '/'
  }
  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label>Username: </label>
          <select
            ref={inputEl}
            required
            className='form-control'
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          >
            {' '}
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label>Description: </label>
          <input
            type='text'
            required
            className='form-control'
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
          />
        </div>
        <div className='form-group'>
          <label>Duration in minutes: </label>
          <input
            type='text'
            required
            className='form-control'
            value={duration}
            onChange={({ target: { value } }) => setDuration(value)}
          />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              value={date}
              onChange={selected => setDate(selected)}
            />
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Edit exercise log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}

export default EditExercise
