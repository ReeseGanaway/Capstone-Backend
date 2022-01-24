import {
  FETCH_CARDS,
  START_FETCHING_CARDS,
  END_FETCHING_CARDS,
} from "../actions/cardActions";

const initialState = {
  card: [],
  isFetchingCards: true,
};

export const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        card: action.payload,
      };
    case START_FETCHING_CARDS:
      return {
        ...state,
        isFetchingCards: true,
      };
    case END_FETCHING_CARDS:
      return {
        ...state,
        isFetchingCards: false,
      };
    default:
      return state;
  }
};
