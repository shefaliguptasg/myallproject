import {
  SET_OB_DATA,
  SET_OB_ID,
  SET_APPROVAL_STATUS,
  ADD_EDIT_OB_USER,
  OB_USER_ERROR,
} from "./actionConstant";

export interface SetObIdAction {
  type: "SET_OB_ID";
  payload: any;
}

export interface SetObDataAction {
  type: "SET_OB_DATA";
  payload: any;
}
export const setObId = (obId: any): SetObIdAction => ({
  type: SET_OB_ID,
  payload: obId,
});
export const setObData = (data: any): any => ({
  type: SET_OB_DATA,
  payload: data,
});
export const setApprovalStatus = (statusObj: any): any => ({
  type: SET_APPROVAL_STATUS,
  payload: statusObj,
});

export const addEditObUser = (userData: any): any => ({
  type: ADD_EDIT_OB_USER,
  payload: userData,
});

export const setObErrors = (errorMsg: any): any => ({
  type: OB_USER_ERROR,
  payload: errorMsg,
});
