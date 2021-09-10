import React, { createContext, useReducer, useEffect } from 'react';
import { getQuery, postQuery } from './actions';
import { reducer } from './reducers';

const initialState = {
    articals: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const withQuery = (payload) => {
        dispatch(getQuery(payload));
    };
    
    const createQuery = (payload) => {
        withQuery(payload);
    };
    return (
        <GlobalContext.Provider value={{
            articals: state.articals,
            withQuery,
            createQuery
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
