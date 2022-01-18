import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
// import { createLogger } from "redux-logger";
import reducer from "./sage/reducers/index";
import getInitialValue from "./sage/getInitialValue";
import saga from "./sage/saga";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const sagaMiddleware = createSagaMiddleware({});

const middleware = [sagaMiddleware];
// if (process.env.NODE_ENV !== "production") {
//   const logger = createLogger();
//   middleware.push(logger);
// }

const store = createStore(
  reducer,
  getInitialValue(),
  applyMiddleware(...middleware)
);

sagaMiddleware.run(saga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
