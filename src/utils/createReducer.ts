import produce, { Draft } from "immer";
import { ActionType } from "../type";

// type Handlers<
//   State,
//   Types extends string,
//   Actions extends ActionType<Types>
// > = {
//   readonly [Type in Types]: (
//     state: State,
//     action: Extract<Actions, ActionType<Type>>
//   ) => State;
// };

/**
 * reducer包装函数 让reducer写法变得更易读，减少样板代码
 * 泛型类型的3个类型参数：
 * 当前拆分域的store值类型、
 * 当前拆分域store 所有actionType联合类型、
 * 当前拆分域store antion方法联合类型
 */
// const createReducer =
//   <State, Types extends string, Actions extends ActionType<Types>>(
//     initState: State,
//     handlers: Handlers<State, Types, Actions>
//   ) =>
//   (state = initState, action) =>
//     handlers.hasOwnProperty(action.type)
//       ? handlers[action.type as Types](state, action)
//       : state;

const createReducer = <
  State,
  T extends { [k: string]: any },
  K extends keyof T
>(
  initialState: State,
  handlers: {
    [k: string]: (
      draft: Draft<State>,
      action: ActionType<Partial<State>, K>,
      state: State
    ) => void;
  }
) => {
  const KEYS = Object.keys(handlers);
  return (
    state: State = initialState,
    action: ActionType<Partial<State>, K>
  ): State =>
    produce(state, (draft) => {
      if (KEYS.indexOf(action.type as string) !== -1) {
        handlers[action.type as string](draft, action, state);
      }
    });
};

export default createReducer;
