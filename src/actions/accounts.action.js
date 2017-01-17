import fetch from 'isomorphic-fetch';
import config from '../config/app';
import {
  GET_ACCOUNTS,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  POST_ACCOUNTS,
  POST_ACCOUNTS_SUCCESS,
  POST_ACCOUNTS_FAILURE
} from '../constants/actions';
import {openMessageAction} from './message.action';
import {destoryAuthAction} from './auth.action';
import Store from '../store';

export function getAccounts() {
  return dispatch => {
    (async() => {
      try {
        let response = await fetch(`${config.baseUrl}/accounts`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `session-token ${Store.getState().auth.token}`
          }
        });
        let data = await response.json();
        if (response.status === 200) {
          dispatch(getAccountsSuccess(data));
        } else {
          dispatch(openMessageAction(data.error, 'error'));
        }
      } catch (e) {
        console.error('Fetch error:', e);
      }
    })();
  }
}

export function getAccountsSuccess(data) {
  return {
    type: GET_ACCOUNTS_SUCCESS,
    payload: {
      data: data
    }
  }
}

export function getAccountsFail() {
  return {
    type: GET_ACCOUNTS_FAILURE
  }
}

export function createAccount(data) {
  return dispatch =>
    fetch(`${config.baseUrl}/accounts`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `session-token ${Store.getState().auth.token}`
      }
    }).then(res => res.json()).then(res => {
      dispatch(createAccountSuccess(res));
      return res;
    }).catch(res => {
      dispatch(openMessageAction(res.error, 'error'));
    });
}

export function createAccountSuccess(data) {
  return {
    type: POST_ACCOUNTS,
    payload: {
      data: data
    }
  }
}

export function createAccountFail() {
  return {
    type: POST_ACCOUNTS_FAILURE
  }
}

export function logoutAction() {
  return dispatch => {
    window.localStorage.removeItem('session');
    window.location.hash = 'login';
    dispatch(destoryAuthAction());
  }
}
