import auth from '../../apis/users';
import history from '../../history';
import { REFRESH_TOKENS, LOGOUT, LOGIN_SUCCESS, LOGIN_FAIL, SET_MESSAGE, SEND_EMAIL } from './types';

import AuthService from '../../services/auth.service';

export const login = (formValues) => (dispatch) => {
    return AuthService.login(formValues.email, formValues.password).then(
      (data) => {
        console.log(data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => {
    AuthService.logout();
    
    dispatch ({
        type: LOGOUT,
    })
}

export const sendEmail = (formValues) => async dispatch => {
  const response = await auth.post(`/auth/sendEmail`, formValues);

dispatch({ type: SEND_EMAIL, payload: response.data });
}

export const refreshTokens = (refreshToken) => async dispatch => {
  const response = await auth.post(`/auth/refresh-tokens`, refreshToken);
  AuthService.refreshTokens(response.data);
  dispatch({ type: REFRESH_TOKENS, payload: response.data });
}