import { CLOSE_EMAIL, OPEN_EMAIL } from "redux-store/actions/actionConstant";

const initialState = {
  file: null,
  open: false,
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_EMAIL: {
      return {
        ...state,
        file: action.payload,
        open: true,
      };
    }
    case CLOSE_EMAIL: {
      return {
        ...state,
        file: null,
        open: false,
      };
    }

    default:
      return state;
  }
};
