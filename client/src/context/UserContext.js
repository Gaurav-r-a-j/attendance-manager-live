import React, { createContext, useContext, useReducer } from 'react';

const initialState = { user: null, percentage_required: 0 };
const UserContext = createContext();

const userReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        case 'UPDATE_PERCENTAGE_REQUIRED':
            return { ...state, percentage_required: action.payload };
        case 'LOGOUT_USER':
            return { ...state, user: null }
        default:
            return state;
    }
};


const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(userReducer, initialState);

    // const updateUser = (updatedUser) => {
    //     dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    // }

    return (
        <UserContext.Provider value={{ user, dispatch }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    return context;
}


export { UserContext, UserProvider };
