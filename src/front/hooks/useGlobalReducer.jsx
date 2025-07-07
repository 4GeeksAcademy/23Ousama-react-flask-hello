import React, { createContext, useReducer, useEffect, useContext } from "react";
import { initialState, appReducer, createActions } from "../js/store";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, dispatch] = useReducer(appReducer, initialState);
        const actions = createActions(dispatch);

        useEffect(() => {
            actions.syncTokenFromSessionStore();
        }, []);

        return (
            <Context.Provider value={{ store: state, actions }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

const useGlobalReducer = () => {
    return useContext(Context);
};

export default injectContext;
export { useGlobalReducer };