import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { useSelector, useDispatch } from "react-redux";
import ReduxTest from "./components/ReduxTest";
import Collection from "./components/Collection";
import Search from "./components/Search";

function App() {
  const [collection_id, setCollection_Id] = useState();

  const [loading, setLoading] = useState(true);
  const collectionId = useSelector((state) => state.collectionId.collectionId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_COLLECTIONID" });
    setLoading(false);
  }, [dispatch]);

  const [currentUser, setCurrentUser] = useState({
    userName: "Your name could be here!",
  });

  const mockLogin = (loginInfo) => {
    const newUser = { ...currentUser };
    newUser.userName = loginInfo.userName;
    setCurrentUser(newUser);
  };

  const setCollectionId = (collectionInfo) => {
    setCollection_Id(collectionInfo);
  };

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <Home
                userName={currentUser.userName}
                collection_id={collection_id}
              />
            }
          />
          <Route path="/" element={<Home userName={currentUser.userName} />} />
          <Route
            path="/login"
            element={<Login user={currentUser} mockLogin={mockLogin} />}
          />

          <Route
            path="/userProfile"
            element={<UserProfile userName={currentUser.userName} />}
          />

          <Route
            path="/signup"
            element={
              <SignUp
                user={currentUser}
                setCollectionId={setCollectionId}
                mockLogin={mockLogin}
              />
            }
          />

          <Route path="/reduxtest" element={<ReduxTest />} />

          <Route
            path="/collection"
            element={<Collection userName={currentUser.userName} />}
          />

          <Route
            path="/search"
            element={<Search userName={currentUser.userName} />}
          />
        </Routes>
      </BrowserRouter>
      {/*<div>{collection_id}</div>
      <div>{!loading ? <p>{collectionId}</p> : <h1>Loading...</h1>}</div>*/}
    </Fragment>
  );
}

export default App;
