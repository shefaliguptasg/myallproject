import {
  ADD_EDIT_LEARNING_USER,
  SET_VALIDATION_ERRORS,
  CLEAR_LEARNING_USER_INFO,
} from "redux-store/actions/actionConstant";

const initialState = {
  errors: {
    userData: [{}],
    sectionData: [],
  },
  learningUserInfo: {
    isEdit: false,
    id: "",
    userData: [
      {
        emp_name: "",
        courses: "",
        description: "",
        image: "",
      },
    ],
    sectionData: [""],
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_EDIT_LEARNING_USER: {
      const newState = { ...state };
      const empData = action.payload || {};

      newState.learningUserInfo["userData"] = empData.userData;

      return {
        ...newState,
        learningUserInfo: {
          ...state.learningUserInfo,
          ...empData,
          userData: [...empData.userData],
          sectionData: [...empData.sectionData],
        },
      };
    }

    case SET_VALIDATION_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };

    case CLEAR_LEARNING_USER_INFO: {
      const newState = { ...state };
      return {
        ...newState,
        learningUserInfo: {
          ...state.learningUserInfo,
          userData: [{}],
          sectionData: [""],
        },
      };
    }
    default:
      return state;
  }
};
