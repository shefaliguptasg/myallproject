import {
  SET_LEARNING_CERTIFICATE_FORM_ID,
  SET_LEARNING_CERTIFICATE_DATA,
  ADD_EDIT_LEARNING_CERTIFICATE_USER,
  LEARNING_CERTIFICATE_USER_ERROR,
} from "./actionConstant";

export interface SetLearningCertificateId {
  type: "SET_LEARNING_CERTIFICATE_FORM_ID";
  payload: any;
}

export const setLearningCertificateId = (
  id: any
): SetLearningCertificateId => ({
  type: SET_LEARNING_CERTIFICATE_FORM_ID,
  payload: id,
});

export const setLearningCertificateData = (data: any): any => ({
  type: SET_LEARNING_CERTIFICATE_DATA,
  payload: data,
});

export const addEditLearningCertificateUser = (userData: any): any => ({
  type: ADD_EDIT_LEARNING_CERTIFICATE_USER,
  payload: userData,
});

export const LearningCertificateUserError = (errorMsg: any): any => ({
  type: LEARNING_CERTIFICATE_USER_ERROR,
  payload: errorMsg,
});
