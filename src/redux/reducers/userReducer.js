/* eslint-disable import/prefer-default-export */
import { UserInitialState } from './initialState';
import * as ActionTypes from '../actions/actionTypes';

export const userReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_NAME:
      return { ...state, name: action.payload };
    case ActionTypes.SET_USERNAME:
      return { ...state, username: action.payload };

    case ActionTypes.REGISTER_USER_START:
      return { ...state, registerUserStart: true };

    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        registerUserStart: false,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email
      };

    case ActionTypes.REGISTER_USER_ERROR:
      return { ...state, registerUserStart: false, registerUserError: true };

    case ActionTypes.LOGIN_USER_START:
      return { ...state, loginUserStart: true };

    case ActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        tokenPresent: true,
        loginUserStart: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case ActionTypes.LOGIN_USER_ERROR:
      return { ...state, loginUserStart: false, loginUserError: true };

    case ActionTypes.LOGOUT_USER_START:
      return { ...state, logoutUserStart: true };

    case ActionTypes.LOGOUT_USER_SUCCESS:
      return { ...UserInitialState, tokenPresent: false };

    case ActionTypes.LOGOUT_USER_ERROR:
      return { ...state, logoutUserStart: false, logoutUserError: true };

    case ActionTypes.DELETE_USER_START:
      return { ...state, deleteUserStart: true };

    case ActionTypes.DELETE_USER_SUCCESS:
      return UserInitialState;

    case ActionTypes.DELETE_USER_ERROR:
      return { ...state, deleteUserStart: false, deleteUserError: true };

    case ActionTypes.EDIT_USER_START:
      return { ...state, editUserStart: true };

    case ActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserStart: false,
        editUserProcessing: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case ActionTypes.EDIT_USER_ERROR:
      return {
        ...state,
        editUserStart: false,
        editUserProcessing: false,
        editUserError: true
      };

    case ActionTypes.EDIT_USER_CANCEL:
      return { ...state, editUserStart: false, editUserError: false };

    case ActionTypes.EDIT_USER_START_PROCESSING:
      return { ...state, editUserProcessing: true };

    case ActionTypes.UPDATE_USER_START:
      return { ...state, editUserStart: true };

    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        editUserStart: false,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case ActionTypes.UPDATE_USER_ERROR:
      return { ...state, editUserStart: false, editUserError: true };

    case ActionTypes.GET_DJ_START:
      return {
        ...state,
        getDJStart: true
      };

    case ActionTypes.GET_DJ_SUCCESS:
      return {
        ...state,
        getDJStart: false,
        name: action.payload.name,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        website: action.payload.website,
        phone: action.payload.phone,
        profile_pic_url: action.payload.profile_pic_url,
        bio: action.payload.bio
      };

    case ActionTypes.GET_DJ_ERROR:
      return {
        ...state,
        getDJError: true
      };

    default:
      return state;
  }
};
