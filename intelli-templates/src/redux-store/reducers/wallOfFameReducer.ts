import {
  ADD_EDIT_WALL_OF_FAME_USER,
  SET_WALL_OF_FAME_ERRORS,
  CLEAR_WALL_OF_FAME_USER_INFO,
} from "redux-store/actions/actionConstant";

const initialState = {
  errors: {},
  wallOfFameUserInfo: {
    isEdit: false,
    id: "",
    quarter_year: "",
    userData: [
      {
        first_name: "",
        last_name: "",
        certificate_name: "",
        image: "",
      },
    ],
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_EDIT_WALL_OF_FAME_USER: {
      const newState = { ...state };
      const empData = action.payload || {};

      newState.wallOfFameUserInfo["userData"] = empData.userData;
      newState.wallOfFameUserInfo["isEdit"] = empData.isEdit || false;
      newState.wallOfFameUserInfo["id"] = empData.id || "";

      return {
        ...newState,
        wallOfFameUserInfo: {
          ...newState.wallOfFameUserInfo,
          quarter_year: empData.quarter_year,
        },
      };
    }

    case SET_WALL_OF_FAME_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_WALL_OF_FAME_USER_INFO:
      return {
        ...state,
        wallOfFameUserInfo: {
          ...state.wallOfFameUserInfo,
          userData: [
            {
              first_name: "",
              last_name: "",
              certificate_name: "",
              image: "",
            },
          ],
          quarter_year: "",
        },
      };

    default:
      return state;
  }
};
