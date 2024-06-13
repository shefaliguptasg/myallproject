import {
  SET_ITALK_CERTIFICATE_FORM_ID,
  SET_ITALK_CERTIFICATE_DATA,
  ADD_EDIT_ITALK_CERTIFICATE_USER,
  ITALK_CERTIFICATE_USER_ERROR,
} from "./actionConstant";

export interface SetITalkCertificateIdAction {
  type: "SET_ITALK_CERTIFICATE_FORM_ID";
  payload: any;
}

export const setITalkCertificateId = (
  iTalkCertificate: any
): SetITalkCertificateIdAction => ({
  type: SET_ITALK_CERTIFICATE_FORM_ID,
  payload: iTalkCertificate,
});

export const setITalkCertificateData = (data: any): any => ({
  type: SET_ITALK_CERTIFICATE_DATA,
  payload: data,
});

export const addEditITalkCertificateUser = (userData: any): any => ({
  type: ADD_EDIT_ITALK_CERTIFICATE_USER,
  payload: userData,
});

export const iTalkCertificateUserError = (errorMsg: any): any => ({
  type: ITALK_CERTIFICATE_USER_ERROR,
  payload: errorMsg,
});
