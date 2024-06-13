import { SET_MAILER_USER_DATA } from "./actionConstant";

export interface SetObDataAction {
  type: "SET_MAILER_USER_DATA";
  payload: any;
}
export const setMailerData = (data: any): any => ({
  type: SET_MAILER_USER_DATA,
  payload: data,
});
