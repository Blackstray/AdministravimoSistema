import scheduledMessages from '../../apis/scheduledMessages';
import history from '../../history';
import {
    CREATE_SCHEDULEDMESSAGE,
    FETCH_SCHEDULEDMESSAGES,
    FETCH_SCHEDULEDMESSAGE,
    DELETE_SCHEDULEDMESSAGE,
    EDIT_SCHEDULEDMESSAGE
} from './types';

export const createScheduledMessage = formValues => async dispatch => {
    const response = await scheduledMessages.post('/scheduledMessages', {...formValues});

    dispatch({ type: CREATE_SCHEDULEDMESSAGE, payload: response.data });
    history.push('/');
}

export const fetchScheduledMessages = () => async dispatch => {
    const response = await scheduledMessages.get('/scheduledMessages');

    dispatch({ type: FETCH_SCHEDULEDMESSAGES, payload: response.data });
};

export const fetchScheduledMessage = (id) => async dispatch => {
    const response = await scheduledMessages.get(`/scheduledMessages/${id}`);

    dispatch({ type: FETCH_SCHEDULEDMESSAGE, payload: response.data });
}; 

export const editScheduledMessage = (id, formValues) => async dispatch => {
    const response = await scheduledMessages.patch(`/scheduledMessages/${id}`, formValues);

    dispatch({ type: EDIT_SCHEDULEDMESSAGE, payload: response.data });
    //Here we do programatic navigation
    history.push('/');
};

export const deleteScheduledMessage = (id) => async dispatch => {
    await scheduledMessages.delete(`/scheduledMessages/${id}`);

    dispatch({ type: DELETE_SCHEDULEDMESSAGE, payload: id});
    history.push('/');
}