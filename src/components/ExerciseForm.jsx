import React from "react";

import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

import DatePicker from "react-datepicker";
import cx from "classnames";

const requiredMessage = "Required";

const exerciseFormSchema = Yup.object().shape({
  username: Yup.string().required(requiredMessage),
  description: Yup.string()
    .min(2, "Too Short!")
    .required(requiredMessage),
  duration: Yup.number()
    .integer()
    .min(1, "Min minutes!")
    .max(60, "Max minutes!")
    .required(requiredMessage),
  date: Yup.string().required(requiredMessage)
});

const ExerciseForm = ({ users = [], onChange }) => {
  return (
    <Formik
      initialValues={{
        username: "",
        description: "",
        duration: "",
        date: ""
      }}
      validationSchema={exerciseFormSchema}
      onSubmit={values => onChange(values)}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue
      }) => {
        const getProps = name => ({
          name,
          value: values[name],
          onChange: handleChange,
          onBlur: handleBlur,
          className: cx("form-control", {
            "is-invalid": errors[name]
          })
        });

        return isSubmitting ? (
          // Replace this with whatever you want...
          <p>Thanks for the Exercise!</p>
        ) : (
          <Form>
            <FormControl label="Username">
              <>
                <select {...getProps("username")}>
                  <>
                    <option value="default">Select user...</option>
                    {users.map(person => (
                      <option key={person} value={person.toLowerCase()}>
                        {person}
                      </option>
                    ))}
                  </>
                </select>
                <FormErrorMessage {...{ errors }} name="username" />
              </>
            </FormControl>

            <FormControl label="Description">
              <>
                <Field {...getProps("description")} />
                <FormErrorMessage {...{ errors }} name="description" />
              </>
            </FormControl>

            <FormControl label="Duration in minutes">
              <>
                <Field {...getProps("duration")} type="number" />
                <FormErrorMessage {...{ errors }} name="duration" />
              </>
            </FormControl>

            <FormControl label="Date">
              <>
                {/* Was present before refactor */}
                <div>
                  <DatePicker
                    {...getProps("date")}
                    selected={values.date}
                    minDate={new Date()}
                    onChange={date => setFieldValue("date", date)}
                  />
                  <FormErrorMessage {...{ errors }} name="date" />
                </div>
              </>
            </FormControl>

            <button type="submit" className="btn btn-primary">
              Create Exercise log
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ExerciseForm;

// Created to manage label and parent className
const FormControl = ({ label, children }) => (
  <div className="form-group">
    <label>{label}:</label>

    {children}
  </div>
);

const FormErrorMessage = ({ name, errors }) => {
  const error = errors && errors[name];

  return error ? (
    <div
      class="invalid-feedback"
      // Add inline style override as error message cannot sit as sibling to datePicker (bootstrap css)
      style={{ display: "block" }}
    >
      {error}
    </div>
  ) : null;
};
