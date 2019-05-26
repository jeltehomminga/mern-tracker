import React, { useState } from 'react'
import axios from 'axios'

const CreateUser = props => {
  const [username, setUsername] = useState('')
  const onSubmit = e => {
    e.preventDefault()
    console.log(username)
    const user = { username }
    axios
      .post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data))
    setUsername('')
  }
  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Username: </label>
          <input
            required
            type='text'
            className='form-control'
            value={username}
            onChange={({ target: { value } }) => setUsername(value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value='Create User'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  )
}

export default CreateUser
