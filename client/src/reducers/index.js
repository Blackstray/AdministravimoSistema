import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import messageGroupReducer from './messageGroupReducer';
import scheduledMessageReducer from './scheduledMessageReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    users: userReducer,
    messageGroups: messageGroupReducer,
    scheduledMessages: scheduledMessageReducer
});