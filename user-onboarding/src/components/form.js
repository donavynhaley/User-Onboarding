import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
const Form = (props) => {
  // pulling users list from app.js
  const { users, setUsers } = props;
  // usestate to create new users
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    tos: false,
  });
  // Error logging
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    tos: "",
  });

  const [post, setPost] = useState([]);

  const validateChange = (e) => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://reqres.in/api/users", newUser).then((res) => {
      setPost(res.data);
      console.log(res.data);
      setUsers([...users, newUser]);
      setNewUser({ name: "", email: "", password: "", tos: false });
    });

    console.log(event);
  };
  const handleChange = (event) => {
    event.persist();
    validateChange(event);
    setNewUser({
      ...newUser,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Must include a name"),
    email: Yup.string()
      .email("Must be a valid email address.")
      .required("Must include email address."),
    password: Yup.string()
      .min(6, "Passwords must be at least 6 characters long.")
      .required("Password is Required"),
    tos: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
  });
  useEffect(() => {
    formSchema.isValid(newUser).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [newUser]);
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label htmlFor="nameInput">
        Name:
        <input
          id="nameInput"
          placeholder="Name"
          type="text"
          name="name"
          value={newUser.name}
          onChange={(event) => handleChange(event)}
          size="50"
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label htmlFor="emailInput">
        Email:
        <input
          id="emailInput"
          placeholder="Email"
          type="email"
          name="email"
          value={newUser.email}
          onChange={(event) => handleChange(event)}
          size="50"
        />
        {errors.email.length > 0 ? (
          <p className="error">{errors.email}</p>
        ) : null}
      </label>
      <label htmlFor="passwordInput">
        Password:
        <input
          id="passwordInput"
          placeholder="Password"
          type="password"
          name="password"
          value={newUser.password}
          onChange={(event) => handleChange(event)}
          size="50"
        />
        {errors.password.length > 0 ? (
          <p className="error">{errors.password}</p>
        ) : null}
      </label>
      <label htmlFor="termsInput">
        Terms of Service:
        <input
          id="termsInput"
          type="checkbox"
          name="tos"
          checked={newUser.tos}
          onChange={(event) => handleChange(event)}
          size="50"
        />
        {errors.tos.length > 0 ? <p className="error">{errors.tos}</p> : null}
      </label>
      <button disabled={buttonDisabled}>Submit!</button>
    </form>
  );
};
export default Form;
