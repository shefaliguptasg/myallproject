import {
  ADD_EDIT_ITALK_USER,
  ITALK_USER_ERROR,
  SET_ITALK_DATA,
  SET_ITALK_ID,
  ITALK_IMAGE,
} from "./actionConstant";

export interface SetItalkIdAction {
  type: "SET_ITalk_ID";
  payload: any;
}
export interface SetITalkDataAction {
  type: "SET_ITALK_DATA";
  payload: any;
}

export const setITalkId = (iTalkId: any): any => ({
  type: SET_ITALK_ID,
  payload: iTalkId,
});
export const setITalkData = (iTalkData: any): any => ({
  type: SET_ITALK_DATA,
  payload: iTalkData,
});

export const addEditItalkUser = (userData: any): any => ({
  type: ADD_EDIT_ITALK_USER,
  payload: userData,
});
export const setItalkErrors = (errorMsg: any): any => ({
  type: ITALK_USER_ERROR,
  payload: errorMsg,
});

export const setItalkImages = (iTalkImage: any): any => ({
  type: ITALK_IMAGE,
  payload: iTalkImage,
});
