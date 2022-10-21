import { createContext, useEffect, useReducer } from "react";
import LoginReducer from "./ReducerContext";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  isFecthing: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
