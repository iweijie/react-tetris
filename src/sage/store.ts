import { createStore, applyMiddleware, Dispatch } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import reducer from "./reducers/index";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware({});

const middleware = [];

if (process.env.NODE_ENV !== "production") {
  const logger = createLogger();
  middleware.push(logger);
}

middleware.push(sagaMiddleware);

const store = createStore(reducer, applyMiddleware(...middleware));

sagaMiddleware.run(saga);

export type RootStore = ReturnType<typeof store.getState>;
// export type Dispatch = typeof store.dispatch;
export type CDispatch = Dispatch<{
  type: string;
  payload?: any;
}>;
export default store;
