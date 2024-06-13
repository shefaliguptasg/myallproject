import {
  ADD_EDIT_ILEAP_USER,
  ILEAP_USER_ERROR,
  SET_ILEAP_DATA,
  SET_ILEAP_ID,
  ILEAP_IMAGE,
} from "../actions/actionConstant";

const initialstate = {
  iLeapId: null,
  iLeapData: null,
  addEditILeapUser: {
    backgroundImage: "",
    isIleapEdit: false,
    iLeapUserInfo: {},
    errors: {},
  },
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_ILEAP_ID:
      return {
        ...state,
        iLeapId: action.payload,
      };
    case SET_ILEAP_DATA:
      return {
        ...state,
        iLeapData: action.payload,
      };

    case ADD_EDIT_ILEAP_USER:
      let newState = {
        ...state,
        addEditILeapUser: { ...state.addEditILeapUser, iLeapUserInfo: {} },
      };

      const userData = action.payload || {};
      if (userData.id) {
        newState.addEditILeapUser["isIleapEdit"] = true;
      } else {
        newState.addEditILeapUser["isIleapEdit"] = false;
      }
      newState.addEditILeapUser["iLeapUserInfo"] = {
        id: userData.id || "",
        header_text: userData.header_text || "",
        first_paragraph: userData.first_paragraph || "",
        topics: userData.topics || [""],
        second_paragraph: userData.second_paragraph || "",
        topic_name: userData.topic_name || "",
      };

      return newState;

    case ILEAP_USER_ERROR: {
      let newState = {
        ...state,
      };
      const errorMsg = action.payload;
      newState.addEditILeapUser = {
        ...newState.addEditILeapUser,
        errors: errorMsg,
      };
      return newState;
    }
    case "CLEAR_IMAGES":
      return {
        ...state,
        addEditILeapUser: {
          ...state.addEditILeapUser,
          backgroundImage: null,
        },
      };
    case ILEAP_IMAGE: {
      let newState = {
        ...state,
      };

      const iLeapImage = action.payload;
      newState.addEditILeapUser = {
        ...newState.addEditILeapUser,
        [iLeapImage.imgKey]: iLeapImage.fileData,
      };

      return newState;
    }
    default:
      return state;
  }
};
