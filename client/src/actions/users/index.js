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

//for google api
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

const user = JSON.parse(localStorage.getItem("user"));

export const createUser = formValues => async (dispatch, getState) => {
    //Jei noresiu issaugoti kurejo userId
    // const { userId } = getState().auth;
    // const response = await users.post('/users', {...formValues, userId});

    await users.post('/users', {...formValues}, {
        headers: {
            'Authorization': `Bearer ${user.tokens.access.token}`
        }
    })
    .then((response) => {
        dispatch({ type: CREATE_USER, payload: response.data });
    })
    .catch((error) => console.error(error))

    //dispatch({ type: CREATE_USER, payload: response.data });
    //Here we do programatic navigation
    history.push('/');
};

export const fetchUsers = () => async dispatch => {
    await users.get('/users', {
        headers: {
            'Authorization': `Bearer ${user.tokens.access.token}`
        }
    })
    .then((response) => {
        dispatch({ type: FETCH_USERS, payload: response.data.results });
    })
    .catch((error) => console.error(error))

    
};

export const fetchUser = (id) => async dispatch => {
    const response = await users.get(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${user.tokens.access.token}`
        }
    });

    dispatch({ type: FETCH_USER, payload: response.data });
}; 

export const editUser = (id, formValues) => async dispatch => {
    const response = await users.patch(`/users/${id}`, formValues, {
        headers: {
            'Authorization': `Bearer ${user.tokens.access.token}`
        }
    });

    dispatch({ type: EDIT_USER, payload: response.data });
    //Here we do programatic navigation
    history.push('/');
};

export const deleteUser = (id) => async dispatch => {
    await users.delete(`/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${user.tokens.access.token}`
        }
    });

    dispatch({ type: DELETE_USER, payload: id});
    history.push('/');
}