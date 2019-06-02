import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import ExerciseForm from "./ExerciseForm";

// No access to server
const stubUsers = ["user-1", "user-2", "user-3"];

const CreateExercise = () => {
  const [formData, setFormData] = useState({});
  const [users, setUsers] = useState(stubUsers || []);

  const formValuesPresent = Object.keys(formData).length > 0;

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then(({ data }) => {
        if (data.length > 0) {
          setUsers(data.map(user => user.username));
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // Is there any data in formData
    formValuesPresent && submitData(formData);
  }, [formData, formValuesPresent]);

  const submitData = formValues => {
    axios
      .post("http://localhost:5000/exercises/add", formValues)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
  };

  return (
    <>
      <h3>Create New Exercise Log</h3>

      <pre>{JSON.stringify({ formData }, null, 2)}</pre>

      <ExerciseForm {...{ users }} onChange={data => setFormData(data)} />
    </>
  );
};

export default CreateExercise;
