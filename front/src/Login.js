import React, { useState } from "react";
import useFetch from "./useFetch";
import "./login.css";
import axios from "axios";


const Login = ({setClient, setUser,user, isSubmitted, setIsSubmitted }) =>{
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const { data } = useFetch('http://127.0.0.1:8000/user/')
  const { data:clients } = useFetch('http://127.0.0.1:8000/client/')
  // User Login info
  const database = data

  const errors = {
    uname: "invalid name",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.name === uname.value);

    // find client

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        setUser(userData)
        if (!user.is_admin){
          let client = clients.find((client) => client.client === userData.id)
          setClient(client)
          axios.post('http://127.0.0.1:8000/shopping_cart/', {
            sc_total_price:0.0,
            client_detail:client.id
          })
          .then(function (response) {
            console.log(response);

            
          })
          .catch(function (error) {
            console.log(error);
          });
        }          
        }

    } else {
      // name not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>name </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}
export default Login;