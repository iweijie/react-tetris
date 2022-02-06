import { bindActionCreators } from "redux";
import actions from "../sage/actions";
import { CDispatch } from "./store";

const dispatchAction = (dispatch: CDispatch) =>
  bindActionCreators(actions, dispatch);

export default dispatchAction;
