import { combineReducers } from "redux";
import { cardsReducer } from "./cardsReducer";
import { collectionIdReducer } from "./collectionIdReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  collectionId: collectionIdReducer,
  card: cardsReducer,
  user: userReducer,
});
