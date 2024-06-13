import {
  ADD_EDIT_IBUDDY_USER,
  IBUDDY_USER_ERROR,
  SET_IBUDDY_ID,
  SET_IBUDDY_DATA,
  BUDDY_IMAGE,
} from "redux-store/actions/actionConstant";

const initialState = {
  iBuddyId: null,
  iBuddyData: null,
  approvalStatus: {},
  addEditIBuddyUser: {
    buddyBackground: "",
    joineeBackground: "",
    isEdit: false,
    iBuddyUserInfo: {},
    errors: {},
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IBUDDY_ID:
      return {
        ...state,
        iBuddyId: action.payload,
      };

    case SET_IBUDDY_DATA:
      return {
        ...state,
        iBuddyData: action.payload,
      };

    case ADD_EDIT_IBUDDY_USER: {
      let newState = {
        ...state,
        addEditIBuddyUser: { ...state.addEditIBuddyUser, iBuddyUserInfo: {} },
      };
      const userData = action.payload || {};

      //console.log(userData);

      if (userData.id) {
        newState.addEditIBuddyUser["isEdit"] = true;
      } else {
        newState.addEditIBuddyUser["isEdit"] = false;
      }

      newState.addEditIBuddyUser["iBuddyUserInfo"] = {
        id: userData.id || "",
        joinee_first_name: userData.joinee_first_name || "",
        joinee_last_name: userData.joinee_last_name || "",
        from_date: userData.from_date || "",
        to_date: userData.to_date || "",
        buddy_text: userData.buddy_text || "",
      };

      //console.log(newState)

      return newState;
    }

    case IBUDDY_USER_ERROR: {
      let newState = {
        ...state,
      };

      const errorMsg = action.payload;
      newState.addEditIBuddyUser = {
        ...newState.addEditIBuddyUser,
        errors: errorMsg,
      };

      return newState;
    }
    case "CLEAR_IMAGES":
      return {
        ...state,
        addEditIBuddyUser: {
          ...state.addEditIBuddyUser,
          buddyBackground: null,
          joineeBackground: null,
        },
      };
    case BUDDY_IMAGE: {
      let newState = {
        ...state,
      };
      const buddyImage = action.payload;
      newState.addEditIBuddyUser = {
        ...newState.addEditIBuddyUser,
        [buddyImage.imgKey]: buddyImage.fileData,
      };

      return newState;
    }

    default:
      return state;
  }
};
