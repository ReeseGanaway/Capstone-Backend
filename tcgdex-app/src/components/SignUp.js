import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function SignUp(props) {
  const [user, setUser] = useState({ userName: "", email: "", password: "" });
  //const [userName, setUserName] = useState("")
  //const [email, setEmail]=useState("")
  //cosnt [password, setPassword]=useState("")
  const [redirect, setRedirect] = useState(false);

  const handleUserNameChange = (e) => {
    const updatedUser = { ...user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;
    setUser(updatedUser);
    //setUserName(inputValue);
  };

  const handleEmailChange = (e) => {
    const updatedUser = { ...user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;
    setUser(updatedUser);
    console.log(updatedUser);
    //setEmail(inputValue);
  };

  const handlePasswordChange = (e) => {
    const updatedUser = { ...user };
    const inputField = e.target.name;
    const inputValue = e.target.value;
    updatedUser[inputField] = inputValue;
    setUser(updatedUser);
    //setUserName(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userName = user.userName;
    let email = user.email;
    let password = user.password;
    let collection_Id = "";
    try {
      const body = { userName, email, password };
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);

      //window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
    try {
      //const body = { email };
      const response = await fetch(
        `http://localhost:5000/users/${user.email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          //body: JSON.stringify(body),
        }
      );
      const userData = await response.json();
      console.log(response);
      //console.log
      props.setCollectionId(userData.collection_id);
      props.mockLogin(user);
      setRedirect(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <Fragment>
      <div className="NavBars">
        <Link className="Links" to="/home">
          Home
        </Link>
        <Link className="Links" to="/login">
          Login
        </Link>
        <Link className="Links" to="/userProfile">
          UserProfile
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            onChange={handleUserNameChange}
            value={user.userName}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleEmailChange}
            value={user.email}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handlePasswordChange}
            value={user.password}
          />
        </div>
        <button>Log In</button>
      </form>
    </Fragment>
  );
}
