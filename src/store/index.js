// import enhanceRedux from "utils/enhance-redux/index";
// import { createLogger } from "redux-logger";
// import commonModal from "./common";
import blockModal from "./block";

// const modals = [commonModal];

// export const { store, reducers, registry, unRegistry } = enhanceRedux(modals, {
// 	enhancer: [createLogger()]
// });

import { createStore, applyMiddleware } from "redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
	middleware.push(createLogger());
}

export const store = createStore(reducer, applyMiddleware(...middleware));
