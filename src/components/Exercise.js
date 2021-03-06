import React from 'react'
import { Link } from 'react-router-dom'

const Exercise = ({ exercise, deleteExercise }) => {
  const { _id, username, description, duration, date } = exercise
  return (
    <tr>
      <td>{username}</td>
      <td>{description}</td>
      <td>{duration}</td>
      <td>{date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${_id}`}>edit</Link> | <a href='./' onClick={() => deleteExercise(_id)}>delete</a>
      </td>
    </tr>
  )
}

export default Exercise
