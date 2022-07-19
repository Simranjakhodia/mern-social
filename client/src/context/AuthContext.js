import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
   /* user: {
        _id: "62396bdcc5df7d5a91bfad17",
        username: "Jane",
        email: "jane@gmail.com",
        profilePicture: "person/3.jpeg",
        coverPicture: "",
        isAdmin: false,
        followers: [],
        followings: [],
    },      */
    user: JSON.parse(localStorage.getItem('user')) || null,                                                                                                                                                                                    
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
        value = {{
            user: state.user, 
            isFetching: state.isFetching, 
            error: state.error,
            dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}