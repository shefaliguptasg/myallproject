import {
  ADD_EDIT_ILEAP_USER,
  ILEAP_IMAGE,
  ILEAP_USER_ERROR,
  SET_ILEAP_DATA,
  SET_ILEAP_ID,
} from "./actionConstant";

export interface SetILeapIdAction {
  type: "SET_ILEAP_ID";
  payload: any;
}

export interface SetIleapDataAction {
  type: "SET_ILEAP_DATA";
  payload: any;
}

export const setILeapId = (iLeapId: any): any => ({
  type: SET_ILEAP_ID,
  payload: iLeapId,
});

export const setILeapData = (ileapData: any): any => ({
  type: SET_ILEAP_DATA,
  payload: ileapData,
});

export const addEditILeapUser = (iLeapUserData: any): any => ({
  type: ADD_EDIT_ILEAP_USER,
  payload: iLeapUserData,
});

export const setILeapErrors = (errorMsg: any): any => ({
  type: ILEAP_USER_ERROR,
  payload: errorMsg,
});

export const setILeapImages = (iLeapImage: any): any => ({
  type: ILEAP_IMAGE,
  payload: iLeapImage,
});
