import react, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function UserProfile(props) {
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
      </div>
      <h1>User Profile</h1>

      <div>Username: {props.userName}</div>
    </Fragment>
  );
}
