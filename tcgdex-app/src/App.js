import "./App.css";
import React, { Fragment, useState } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import SignUp from "./components/SignUp";

function App() {
  const [collection_id, setCollection_Id] = useState();
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
            element={<Home userName={currentUser.userName} />}
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
        </Routes>
      </BrowserRouter>
      <div>{collection_id}</div>
    </Fragment>
  );
}

export default App;
