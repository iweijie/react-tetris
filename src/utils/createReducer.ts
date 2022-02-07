import produce, { Draft } from "immer";
import { ActionType, ObjectKeyType } from "../type";

type HandleType<S> = (
  draft: Draft<S>,
  action: ActionType<ObjectKeyType>
) => void | S;

type OBjectHandleTypes<S> = {
  [k: string]: HandleType<S>;
};

const createReducer = <State>(
  initialState: State,
  handlers: OBjectHandleTypes<State>
) => {
  const KEYS = Object.keys(handlers);

  const handle = produce((draft, action) => {
    if (KEYS.indexOf(action.type as string) !== -1) {
      const data = handlers[action.type](draft, action);
      if (data !== void 0) return data;
    }

    return draft;
  });

  return (
    state: State = initialState,
    action: ActionType<keyof OBjectHandleTypes<State>>
  ): State => handle(state, action);
};

export default createReducer;
