import produce, { Draft } from "immer";
import { ActionType, ObjectKeyType } from "../type";

type HandleType<S> = (
  draft: Draft<S>,
  action: ActionType<ObjectKeyType>,
  state: S
) => void | S;

type OBjectHandleTypes<S> = {
  [k: string]: HandleType<S>;
};

const createReducer = <State>(
  initialState: State,
  handlers: OBjectHandleTypes<State>
) => {
  const KEYS = Object.keys(handlers);
  return (
    state: State = initialState,
    action: ActionType<keyof OBjectHandleTypes<State>>
  ): State =>
    produce(state, (draft) => {
      if (KEYS.indexOf(action.type as string) !== -1) {
        handlers[action.type](draft, action, state);
      }
    });
};

export default createReducer;
