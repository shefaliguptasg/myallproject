import {
  ADD_EDIT_ITALK_USER,
  ITALK_USER_ERROR,
  SET_ITALK_DATA,
  SET_ITALK_ID,
  ITALK_IMAGE,
} from "../actions/actionConstant";

const initialstate = {
  iTalkId: null,
  iTalkData: null,
  addEditItalkUser: {
    backgroundImage: "",
    profileImage: "",
    isItalkEdit: false,
    iTalkUserInfo: {},
    errors: {},
  },
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_ITALK_ID:
      return {
        ...state,
        iTalkId: action.payload,
      };
    case SET_ITALK_DATA:
      return {
        ...state,
        iTalkData: action.payload,
      };

    case ADD_EDIT_ITALK_USER:
      let newState = {
        ...state,
        addEditItalkUser: { ...state.addEditItalkUser, iTalkUserInfo: {} },
      };

      const userData = action.payload || {};
      if (userData.id) {
        newState.addEditItalkUser["isItalkEdit"] = true;
      } else {
        newState.addEditItalkUser["isItalkEdit"] = false;
      }
      newState.addEditItalkUser["iTalkUserInfo"] = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        title: userData.title || "",
        topic_name: userData.topic_name || "",
        designation: userData.designation || "",
        from: userData.from || "",
        to: userData.to || "",
        date: userData.date || "",
        topics: userData.topics || [""],
        info:
          userData.info ||
          "We are exited to invite you all for the iTalks session on <b>Topic Name</b> ",
        join_us:
          userData.join_us ||
          "Join us for this engaging session where you can  gain insights into <b>Topic Name</b>.",
        attendee_text: userData.attendee_text || "",
      };

      return newState;

    case ITALK_USER_ERROR: {
      let newState = {
        ...state,
      };
      const errorMsg = action.payload;
      newState.addEditItalkUser = {
        ...newState.addEditItalkUser,
        errors: errorMsg,
      };
      return newState;
    }
    case "CLEAR_IMAGES":
      return {
        ...state,
        addEditItalkUser: {
          ...state.addEditItalkUser,
          profileImage: null,
          backgroundImage: null,
        },
      };
    case ITALK_IMAGE: {
      let newState = {
        ...state,
      };
      const iTalkImage = action.payload;
      newState.addEditItalkUser = {
        ...newState.addEditItalkUser,
        [iTalkImage.imgKey]: iTalkImage.fileData,
      };

      return newState;
    }
    default:
      return state;
  }
};
