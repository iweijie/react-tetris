import enhanceRedux from "@/utils/enhance-redux/index";
import { createLogger } from "redux-logger";
import blockModal from "./block";

export const { store, reducers, registry, unRegistry } = enhanceRedux([blockModal], {
	enhancer: [createLogger()]
});
