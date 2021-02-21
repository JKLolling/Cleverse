import { csrfFetch } from "./csrf"


const SET_SESSION = 'session/SET_SESSION'
const REMOVE_SESSION = 'session/REMOVE_SESSION'

const setSession = (user) => {
  return {
    type: SET_SESSION,
    user
  }
}

export const removeSession = () => {
  return {
    type: REMOVE_SESSION
  }
}

export const login = (user) => async (dispatch) => {
  const { credential, password } = user
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password })
  })

  const data = await res.json()

  dispatch(setSession(data.user))
  return res
}

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};


export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setSession(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeSession());
  return response;
};

const initialState = { user: null }
export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SESSION:
      if (!action.user) {
        return { user: null }
      } else {
        return {
          user: { ...action.user }
        }
      }
    case REMOVE_SESSION:
      return {
        user: null
      }
    default:
      return state;
  }
}
