import _ from 'lodash';
import {
    CREATE_SCHEDULEDMESSAGE,
    FETCH_SCHEDULEDMESSAGES,
    FETCH_SCHEDULEDMESSAGE,
    DELETE_SCHEDULEDMESSAGE,
    EDIT_SCHEDULEDMESSAGE
} from '../actions/scheduledMessages/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_SCHEDULEDMESSAGES:
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_SCHEDULEDMESSAGE:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_SCHEDULEDMESSAGE:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_SCHEDULEDMESSAGE:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_SCHEDULEDMESSAGE:
            return _.omit(state, action.payload);
        default:
            return state; 
    }
}