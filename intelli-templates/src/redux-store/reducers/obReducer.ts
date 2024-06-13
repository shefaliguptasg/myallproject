import {
  SET_OB_DATA,
  SET_OB_ID,
  SET_APPROVAL_STATUS,
  ADD_EDIT_OB_USER,
  OB_USER_ERROR,
} from "../actions/actionConstant";

const initialState = {
  obId: null,
  obData: null,
  approvalStatus: {},
  addEditObUser: {
    isEdit: false,
    obUserInfo: {},
    errors: {},
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_OB_ID:
      return {
        ...state,
        obId: action.payload,
      };
    case SET_OB_DATA:
      return {
        ...state,
        obData: action.payload,
      };
    case SET_APPROVAL_STATUS:
      return {
        ...state,
        approvalStatus: action.payload,
      };
    case ADD_EDIT_OB_USER: {
      let newState = {
        ...state,
        addEditObUser: {},
      };
      const userData = action.payload || {};
      if (userData.id) {
        newState.addEditObUser["isEdit"] = true;
      } else {
        newState.addEditObUser["isEdit"] = false;
      }
      newState.addEditObUser["obUserInfo"] = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        title: userData.title || "Welcome Aboard",
        designation: userData.designation || "",
        email: userData.email || "",
        mobile_no: userData.mobile_no || "",
        manager: userData.manager || "",
        location: userData.location || "",
        info:
          userData.info ||
          "We are pleased to announce that <b>Employee Name</b> has joined Intelliswift Software India Pvt. Ltd. as a <b>Position</b> from <b>October 3, 2023.</b>",
        education:
          userData.education ||
          "He holds a degree in <b>Degree Name</b> from <b>University Name</b>",
        past_detail:
          userData.past_detail ||
          "He has pervious experience as a <b>Previous Position</b> in <b>Company Name</b>",
        life_style:
          userData.life_style ||
          "Please join us in welcoming <b>Employee Name</b> to the intelliswift family!",
        wish_text:
          userData.wish_text || "We wish him all the success in this new role!",
        hr_approval: userData.hr_approval || "",
        marketing_approval: userData.marketing_approval || "",
      };

      return newState;
    }
    case OB_USER_ERROR: {
      let newState = {
        ...state,
      };
      const errorMsg = action.payload;
      newState.addEditObUser = {
        ...newState.addEditObUser,
        errors: errorMsg,
      };
      return newState;
    }
    default:
      return state;
  }
};
