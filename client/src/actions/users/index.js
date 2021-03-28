import users from '../../apis/users';
import history from '../../history';
import { 
    SIGN_IN, 
    SIGN_OUT, 
    CREATE_USER,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    EDIT_USER
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createUser = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await users.post('/users', {...formValues, userId});

    dispatch({ type: CREATE_USER, payload: response.data });
    //Here we do programatic navigation
    history.push('/');
};

export const fetchUsers = () => async dispatch => {
    const response = await users.get('/users');

    dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
    const response = await users.get(`/users/${id}`);

    dispatch({ type: FETCH_USER, payload: response.data });
}; 

export const editUser = (id, formValues) => async dispatch => {
    const response = await users.patch(`/users/${id}`, formValues);

    dispatch({ type: EDIT_USER, payload: response.data });
    //Here we do programatic navigation
    history.push('/');
};

export const deleteUser = (id) => async dispatch => {
    await users.delete(`/users/${id}`);

    dispatch({ type: DELETE_USER, payload: id});
    history.push('/');
}