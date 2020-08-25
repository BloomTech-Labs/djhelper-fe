/* eslint-disable import/prefer-default-export */
import { ModalInitialState } from './initialState';
import * as ActionTypes from '../actions/actionTypes';

export const modalReducer = (state = ModalInitialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOGIN_MODLA_SUCCESS:
      return {
        ...state,
        loginModalIsOpen: !state.loginModalIsOpen
      };
    case ActionTypes.TOGGLE_REGISTER_MODAL_SUCCESS:
      return {
        ...state,
        registerModalIsOpen: !state.registerModalIsOpen
      };
    case ActionTypes.TOGGLE_HELP_MODAL_SUCCESS:
      return {
        ...state,
        helpModalIsOpen: !state.helpModalIsOpen
      };
    default:
      return state;
  }
};
