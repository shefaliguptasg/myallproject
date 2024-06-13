import {
  ADD_EDIT_IBUDDY_USER,
  IBUDDY_USER_ERROR,
  SET_IBUDDY_DATA,
  SET_IBUDDY_ID,
  BUDDY_IMAGE,
} from "./actionConstant";

export interface SetIBuddyIdAction {
  type: "SET_IBUDDY_ID";
  payload: any;
}

export const setIBuddyId = (iBuddyId: any): SetIBuddyIdAction => ({
  type: SET_IBUDDY_ID,
  payload: iBuddyId,
});

export const setBuddyData = (data: any): any => ({
  type: SET_IBUDDY_DATA,
  payload: data,
});

export const addEditIBuddyUser = (userData: any): any => ({
  type: ADD_EDIT_IBUDDY_USER,
  payload: userData,
});

export const setIBuddyErrors = (errorMsg: any): any => ({
  type: IBUDDY_USER_ERROR,
  payload: errorMsg,
});
export const setBuddyImages = (buddyImage: any): any => ({
  type: BUDDY_IMAGE,
  payload: buddyImage,
});
