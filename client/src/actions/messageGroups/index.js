import messageGroups from '../../apis/messageGroups';
import history from '../../history';
import {
    CREATE_MESSAGEGROUP,
    FETCH_MESSAGEGROUPS,
    FETCH_MESSAGEGROUP,
    DELETE_MESSAGEGROUP,
    EDIT_MESSAGEGROUP
} from './types';

export const createMessageGroup = formValues => async dispatch => {
    const response = await messageGroups.post('/messageGroups', {...formValues});

    dispatch({ type: CREATE_MESSAGEGROUP, payload: response.data });
    history.push('/messages');
}

export const fetchMessageGroups = () => async dispatch => {
    const response = await messageGroups.get('/messageGroups');

    dispatch({ type: FETCH_MESSAGEGROUPS, payload: response.data });
};

export const fetchMessageGroup = (id) => async dispatch => {
    const response = await messageGroups.get(`/messageGroups/${id}`);

    dispatch({ type: FETCH_MESSAGEGROUP, payload: response.data });
}; 

export const editMessageGroup = (id, formValues) => async dispatch => {
    const response = await messageGroups.patch(`/messageGroups/${id}`, formValues);

    dispatch({ type: EDIT_MESSAGEGROUP, payload: response.data });
    //Here we do programatic navigation
    history.push('/messages');
};

export const deleteMessageGroup = (id) => async dispatch => {
    await messageGroups.delete(`/messageGroups/${id}`);

    dispatch({ type: DELETE_MESSAGEGROUP, payload: id});
    history.push('/messages');
}