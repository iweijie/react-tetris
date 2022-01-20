import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reducer from "./reducers/index";
import "./index.css";

const sagaMiddleware = createSagaMiddleware({});

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  const logger = createLogger();
  middleware.push(logger);
}

middleware.push(sagaMiddleware);

const store = createStore(reducer, applyMiddleware(...middleware));

export type RootStore = ReturnType<typeof store.getState>;

export default store;
