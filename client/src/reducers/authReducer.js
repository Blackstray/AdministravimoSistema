import { SIGN_IN, SIGN_OUT } from '../actions/users/types';
import { REFRESH_TOKENS, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL, SEND_EMAIL } from '../actions/auth/types';

const user = JSON.parse(localStorage.getItem("user"));

const INITIAL_STATE = user ? { isSignedIn: true, user, tokens: user.tokens } : { isSignedIn: false, user: null, tokens: null };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case SIGN_IN:
        //     return {...state, isSignedIn: true, userId: action.payload };
        // case SIGN_OUT:
        //     return {...state, isSignedIn: false, userId: null };
        // case LOGIN:
        //     return {...state, isSignedIn: true, user: action.payload.user, tokens: action.payload.tokens };
        // case LOGOUT:
        //     return {...state, isSignedIn: false, user: null };
        case LOGIN_SUCCESS:
        return {
            ...state,
            isSignedIn: true,
            user: action.payload.user.user,
            tokens: action.payload.user.tokens,
        };
        case LOGIN_FAIL:
        return {
            ...state,
            isSignedIn: false,
            user: null,
            tokens: null,
        };
        case LOGOUT:
        return {
            ...state,
            isSignedIn: false,
            user: null,
            tokens: null,
        };
        case SEND_EMAIL:
        return {
            ...state,
        }
        case REFRESH_TOKENS:
        return {
            ...state,
            tokens: action.payload.tokens,
        }
        default:
            return state;
    }
};