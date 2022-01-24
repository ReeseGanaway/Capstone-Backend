import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch, ReactReduxContext } from "react-redux";
import { Link } from "react-router-dom";
import { getUserThunk } from "../redux/actions/userThunk";

export default function Collection(props) {
  /*  const [user, isFetchingUser] = useSelector((state) => [
    state.user.user,
    state.user.isFetchingUser,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserThunk);
  }, [dispatch]);

  return (
    <Fragment>
      <div>{user.username}</div>
    </Fragment>
  );
}*/

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
        <Link className="Links" to="/search">
          Search
        </Link>
      </div>
      <div>{props.userName}'s Collection</div>
    </Fragment>
  );
}
