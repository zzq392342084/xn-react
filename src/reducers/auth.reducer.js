import {
  SET_AUTH,
  DESTORY_AUTH
} from '../constants/actions';

const initialState = {
  token: null,
  username: null,
  role: null
};

let switchMap = {};

switchMap[SET_AUTH] = (state, action) => {
    return Object.assign({}, state, {
      token: action.payload.token,
      username: action.payload.username,
      role: action.payload.role
    });
};

switchMap[DESTORY_AUTH] = (state) => {
  return Object.assign({}, state, {
    token: null,
    username: null,
    role: null
  });
};

export default (state = initialState, action) => {
  if (switchMap[action.type]) {
    return switchMap[action.type](state, action);
  } else{
    return state;
  }
}
