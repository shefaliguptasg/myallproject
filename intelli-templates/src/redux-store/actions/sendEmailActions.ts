import { CLOSE_EMAIL, OPEN_EMAIL } from "./actionConstant";

export const openEmail = (data: any): any => ({
  type: OPEN_EMAIL,
  payload: data,
});
export const closeEmail = () => ({ type: CLOSE_EMAIL });
