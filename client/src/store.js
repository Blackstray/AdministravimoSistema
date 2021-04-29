import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from 'redux-thunk';
import reducers from "./reducers";

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducers,
  composeEnchancers(applyMiddleware(reduxThunk))
);