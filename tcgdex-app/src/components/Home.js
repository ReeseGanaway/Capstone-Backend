import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
  //props.mockLogin(props.userName);

  return (
    <Fragment>
      <div className="NavBars">
        <Link className="Links" to="/home">
          Home
        </Link>
        <Link className="Links" to="/userProfile">
          UserProfile
        </Link>
        <Link className="Links" to="/login">
          Login
        </Link>
        <Link className="Links" to="/collection">
          Collection
        </Link>
      </div>
      <div>{props.userName}</div>
      <div>{props.collection_id}</div>
    </Fragment>
  );
}
