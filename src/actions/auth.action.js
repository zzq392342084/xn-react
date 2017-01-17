import {
  SET_AUTH,
  DESTORY_AUTH
} from '../constants/actions';

export function setAuthAction(authData) {
  return {
    type: SET_AUTH,
    payload: {
      token: authData.sessionToken,
      username: authData.username,
      role: authData.role
    }
  }
}

export function destoryAuthAction() {
  return {
    type: DESTORY_AUTH
  }
}

export function FlushSession() {
  return dispatch => {
    window.localStorage.removeItem('session');
  }
}
