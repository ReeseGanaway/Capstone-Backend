import {
  GET_COLLECTIONID,
  RESET,
  INCREMENT,
} from "../actions/collectionIdActions";

const initialState = {
  collectionId: 0,
};

export const collectionIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET:
      return {
        state: (state.collectionId = 0),
        ...state,
      };
    case INCREMENT:
      return {
        state: state.collectionId++,
        ...state,
      };
    case GET_COLLECTIONID:
      return {
        state: state.collectionId,
        ...state,
      };
    default:
      return state;
  }
};
