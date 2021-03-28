import _ from 'lodash';
import {
    CREATE_MESSAGEGROUP,
    FETCH_MESSAGEGROUPS,
    FETCH_MESSAGEGROUP,
    DELETE_MESSAGEGROUP,
    EDIT_MESSAGEGROUP
} from '../actions/messageGroups/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_MESSAGEGROUPS:
            return { ...state, ..._.mapKeys(action.payload, 'id')};
        case FETCH_MESSAGEGROUP:
            return {...state, [action.payload.id]: action.payload};
        case CREATE_MESSAGEGROUP:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_MESSAGEGROUP:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_MESSAGEGROUP:
            return _.omit(state, action.payload);
        default:
            return state; 
    }
}