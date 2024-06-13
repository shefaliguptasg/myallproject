import {
  ADD_EDIT_TND_USER,
  SET_TND_ID,
  SET_TND_DATA,
  TND_USER_ERROR,
} from "./actionConstant";

export interface setTndAction {
  type: typeof SET_TND_ID;
  payload: any;
}

export const setTndId = (tndId: any): setTndAction => ({
  type: SET_TND_ID,
  payload: tndId,
});

export const addEditTndUser = (tndUserData: any): any => ({
  type: ADD_EDIT_TND_USER,
  payload: tndUserData,
});

export const setTndData = (data: any): any => ({
  type: SET_TND_DATA,
  payload: data,
});

export const setTndErrors = (errorMsg: any): any => ({
  type: TND_USER_ERROR,
  payload: errorMsg,
});
