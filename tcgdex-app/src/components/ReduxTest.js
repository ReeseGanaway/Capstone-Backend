import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCardsThunk } from "../redux/actions/cardsThunk";
import { SET_USERNAME } from "../redux/actions/usernameActions";
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
    dispatch(getCardsThunk());
  }, [dispatch]);

  const [email, setEmail] = useState("");

  const handleUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleDispatch = () => {
    dispatch(getUserThunk(email));
    dispatch({ type: SET_USERNAME });
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
    </Fragment>
  );
}
