import {
  FETCH_CARDS,
  START_FETCHING_CARDS,
  END_FETCHING_CARDS,
} from "./cardActions";

export const getCardsThunk = () => async (dispatch) => {
  try {
    dispatch({ type: START_FETCHING_CARDS });
    const card = await fetch("http://localhost:5000/cards");
    const data = await card.json();
    dispatch({ type: FETCH_CARDS, payload: data });
    dispatch({ type: END_FETCHING_CARDS });
  } catch (err) {
    console.error(err.message);
  }
};
