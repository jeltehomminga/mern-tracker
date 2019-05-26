import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateExercise = props => {
  const inputEl = useRef(null)
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(0)
  const [date, setDate] = useState(new Date())
  const [users, setUsers] = useState([])
  useEffect(() => {
    setUsername('test user')
    setUsers(['test user'])
  }, [])
  const onSubmit = e => {
    e.preventDeafult()
    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date
    }
    console.log(exercise)
    window.location = '/'
  }
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
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
              onChange={selected => {
                debugger
                return setDate(selected)
              }}
            />
          </div>
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create exercise log'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateExercise
