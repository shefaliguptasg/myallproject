import {
  ADD_EDIT_TND_USER,
  SET_TND_ID,
  SET_TND_DATA,
  TND_USER_ERROR,
  SET_APPROVAL_STATUS,
} from "redux-store/actions/actionConstant";

const initialState = {
  tndId: null,
  tndData: null,
  approvalStatus: {},
  addEditTndUser: {
    isEdit: false,
    tndUserInfo: {},
    errors: {},
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TND_ID:
      return {
        ...state,
        tndId: action.payload,
      };
    case SET_TND_DATA:
      return {
        ...state,
        tndData: action.payload,
      };
    case SET_APPROVAL_STATUS:
      return {
        ...state,
        approvalStatus: action.payload,
      };
    case ADD_EDIT_TND_USER: {
      const newState = { ...state, addEditTndUser: {} };

      const userData = action.payload || {};

      newState.addEditTndUser["tndUserInfo"] = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        title:
          userData.title ||
          "Success is where preparation and opportunity meet.",
        designation: userData.designation || "",
        td_section: userData.td_section || [
          "Our heartiest congratulations on completing the <b>Certificate Name</b> certification.",
          "We appreciate your perseverance and hard work - you make us proud. Keep up the good work!",
        ],
      };

      // Coditions
      if (userData.id) {
        newState.addEditTndUser["isEdit"] = true;
      } else {
        newState.addEditTndUser["isEdit"] = false;
      }

      return newState;
    }

    case TND_USER_ERROR: {
      let newState = {
        ...state,
      };

      const errorMsg = action.payload;
      newState.addEditTndUser = {
        ...newState.addEditTndUser,
        errors: errorMsg,
      };
      return newState;
    }
    default:
      return state;
  }
};
