import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import BurgerReducer from "./store/reducer/burgerBuilder";
import OrderReducer from "./store/reducer/order";
import thunk from "redux-thunk";
import authReducer from "./store/reducer/auth";

// const logger = store => {
//   return next => {
//     return action => {
//       // console.log("[middleware]", action);
//       const result = next(action);
//       // console.log("[middleware]", result);
//       return result;
//     }
//   }
// }
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  burger: BurgerReducer,
  orders: OrderReducer,
  auth: authReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
