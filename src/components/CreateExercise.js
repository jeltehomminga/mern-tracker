import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const CreateExercise = () => {
  const inputEl = useRef(null)
  const username = useFormInput('')
  const description = useFormInput('')
  const duration = useFormInput(0)
  const date = useFormInput(new Date())
  const [users, setUsers] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/users/')
      .then(res => {
        if (res.data.length > 0) {
          setUsers(res.data.map(user => user.username))
        }
      })
      .catch(err => console.log(err))
  }, [])
  const onSubmit = e => {
    e.preventDefault()
    const exercise = {
      username: username.value,
      description: description.value,
      duration: duration.value,
      date: date.value
    }
    axios
      .post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data))
      debugger
    // setUsername('')
    window.location = '/'
  }
  return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <label>Username: </label>
          <select ref={inputEl} required className='form-control' {...username}>
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
            {...description}
          />
        </div>
        <div className='form-group'>
          <label>Duration in minutes: </label>
          <input type='text' required className='form-control' {...duration} />
        </div>
        <div className='form-group'>
          <label>Date: </label>
          <div>
            <DatePicker selected={date.value} {...date} />
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

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue)
  const handleChange = e => {
    const newValue = e.target ? e.target.value : e
    setValue(newValue)
  }
  return {
    value,
    onChange: handleChange
  }
}

export default CreateExercise
