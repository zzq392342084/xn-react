import fetch from 'isomorphic-fetch';
import config from '../config/app';
import {openMessageAction} from '../actions/message.action';
import {setAuthAction} from '../actions/auth.action';
import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_AJAX_START
} from '../constants/actions';

export function loginStartAction(username, password) {
  return dispatch => {
    dispatch(loginAjaxStartAction());
    (async () => {
      try {
        let response = await fetch(`${config.baseUrl}/login`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });
        let data = await response.json();
        if (response.status === 200) {
          dispatch(setAuthAction(data));
          dispatch(loginSuccessAction());
          dispatch(openMessageAction('登录成功', 'success'));
          window.localStorage.setItem('session', JSON.stringify(authData));
          window.location.hash = '/';
        } else {
          dispatch(openMessageAction(data.error, 'error'));
          dispatch(loginFailedAction());
        }
      } catch (e) {
        console.error('Fetch error:', e);
        dispatch(loginFailedAction());
      }
    })();
  }
}

function loginAjaxStartAction() {
    return {
      type: LOGIN_AJAX_START
    }
}

function loginSuccessAction() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginFailedAction() {
  return {
    type: LOGIN_FAILURE
  };
}
