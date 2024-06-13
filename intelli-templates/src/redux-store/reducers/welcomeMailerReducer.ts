import { SET_MAILER_USER_DATA } from "../actions/actionConstant";

const initialState = {
  mailerUserData: null,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_MAILER_USER_DATA:
      return {
        ...state,
        mailerUserData: action.payload,
      };
    default:
      return state;
  }
};
