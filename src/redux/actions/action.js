import * as ActionTypes from './actionTypes';
import axiosWithAuth from '../../utils/axiosWithAuth';

export const setName = name => {
  return { type: ActionTypes.SET_NAME, payload: name };
};

export const setUsername = username => {
  return { type: ActionTypes.SET_USERNAME, payload: username };
};

// onboarding
export const loginUser = (userInfo, history) => dispatch => {
  dispatch({ type: ActionTypes.LOGIN_USER_START });

  axiosWithAuth()
    .post('/login/dj/', userInfo)
    .then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: response.data
      });
      if (history.location.pathname === '/') {
        history.push('/dj');
      }
    })
    .catch(err => {
      dispatch({ type: ActionTypes.LOGIN_USER_ERROR, payload: err });
    });
};

export const registerUserAction = (infoNeeded, history) => dispatch => {
  dispatch({ type: ActionTypes.REGISTER_USER_START });
  axiosWithAuth()
    .post('/register/dj/', infoNeeded)
    .then(response => {
      // history.push('/dj');
      dispatch({
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: response.data
      });

      // login user

      dispatch({ type: ActionTypes.LOGIN_USER_START });
      axiosWithAuth()
        .post('/login/dj/', infoNeeded)
        .then(response2 => {
          localStorage.setItem('token', response2.data.token);
          dispatch({
            type: ActionTypes.LOGIN_USER_SUCCESS,
            payload: response2.data
          });
          if (history.location.pathname === '/') {
            history.push('/dj');
          }
        })
        .catch(err => {
          dispatch({ type: ActionTypes.LOGIN_USER_ERROR, payload: err });
        });

      // end of login user
    })
    .catch(err => {
      dispatch({ type: ActionTypes.REGISTER_USER_ERROR, payload: err });
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: ActionTypes.LOGOUT_USER_START });
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.LOGOUT_USER_SUCCESS });
  } else {
    dispatch({
      type: ActionTypes.LOGOUT_USER_ERROR,
      payload: 'no token found'
    });
  }
};

// CRUD for DJs

export const deleteUser = id => dispatch => {
  dispatch({ type: ActionTypes.DELETE_USER_START });
  axiosWithAuth()
    .delete(`/auth/dj/${id}`)
    .then(response => {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      dispatch({ type: ActionTypes.DELETE_USER_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.DELETE_USER_ERROR, payload: err });
    });
};

export const startEditUser = () => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_START });
};

export const editUser = (id, userInfo) => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_START_PROCESSING });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      dispatch({ type: ActionTypes.EDIT_USER_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.EDIT_USER_ERROR, payload: err });
    });
};

export const cancelEditUser = () => dispatch => {
  dispatch({ type: ActionTypes.EDIT_USER_CANCEL });
};

export const updateUser = (history, id, userInfo) => dispatch => {
  dispatch({ type: ActionTypes.UPDATE_USER_START });
  axiosWithAuth()
    .put(`/auth/dj/${id}`, userInfo)
    .then(response => {
      dispatch({
        type: ActionTypes.UPDATE_USER_SUCCESS,
        payload: response.data
      });
      history.push('/dj');
    })
    .catch(err => {
      dispatch({ type: ActionTypes.UPDATE_USER_ERROR, payload: err });
      history.push('/dj');
    });
};

export const getDJ = id => dispatch => {
  dispatch({ type: ActionTypes.GET_DJ_START });
  axiosWithAuth()
    .get(`/dj/${id}`)
    .then(response => {
      dispatch({ type: ActionTypes.GET_DJ_SUCCESS, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: ActionTypes.GET_DJ_ERROR, payload: err });
    });
};
