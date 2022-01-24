import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardsThunk } from "../redux/actions/cardsThunk";
import { getUserThunk } from "../redux/actions/userThunk";

export default function ReduxTest() {
  //const [loading, setLoading] = useState(true);
  // const collectionId = useSelector((state) => state.collectionId.collectionId);

  /*const increment = () => {
    dispatch({ type: "INCREMENT" });
  };*/

  /*const reset = () => {
    dispatch({ type: "RESET" });
  };*/

  /*useEffect(() => {
    dispatch({ type: "GET_COLLECTIONID" });
    setLoading(false);
  }, [dispatch]);*/

  const [card, isFetchingCards] = useSelector((state) => [
    state.card.card,
    state.card.isFetchingCards,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardsThunk);
  }, [dispatch]);

  const [user, isFetchingUser] = useSelector((state) => [
    state.user.user,
    state.user.isFetchingUser,
  ]);

  const [email, setEmail] = useState("");

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleDispatch = () => {
    dispatch(getUserThunk(email));
  };

  return (
    <Fragment>
      {/*<div>
        {!loading ? <p>{collectionId}</p> : <h1>Loading...</h1>}
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
     </div>*/}

      {
        <div>
          {isFetchingCards ? (
            <p>Loading...</p>
          ) : (
            card.map((card) => (
              <div key={card.id}>
                <h1>{card.pokemon}</h1>
              </div>
            ))
          )}{" "}
        </div>
      }

      <div>
        {isFetchingUser && user === {} ? (
          <div>Fetching User...</div>
        ) : (
          <div>
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>{user.collection_id}</div>
          </div>
        )}

        <input
          onChange={handleUserEmail}
          placeholder="Search for an email here"
        />
        <button onClick={handleDispatch}>Search Email</button>
      </div>
    </Fragment>
  );
}
