import {
  SET_LEARNING_CERTIFICATE_FORM_ID,
  SET_LEARNING_CERTIFICATE_DATA,
  ADD_EDIT_LEARNING_CERTIFICATE_USER,
  LEARNING_CERTIFICATE_USER_ERROR,
} from "redux-store/actions/actionConstant";

const initialState = {
  learningCertificateId: null,
  learningCertificateData: null,
  approvalStatus: {},
  addEditLearningCertificateUser: {
    isEdit: false,
    learningCertificateUserInfo: {},
    errors: {},
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LEARNING_CERTIFICATE_FORM_ID:
      return {
        ...state,
        learningCertificateId: action.payload,
      };

    case SET_LEARNING_CERTIFICATE_DATA:
      return {
        ...state,
        learningCertificateData: action.payload,
      };

    case ADD_EDIT_LEARNING_CERTIFICATE_USER: {
      const newState = {
        ...state,
        addEditLearningCertificateUser: {
          ...state.addEditLearningCertificateUser,
          learningCertificateUserInfo: {},
        },
      };
      const userData = action.payload || {};
      if (userData.id) {
        newState.addEditLearningCertificateUser["isEdit"] = true;
      } else {
        newState.addEditLearningCertificateUser["isEdit"] = false;
      }

      newState.addEditLearningCertificateUser["learningCertificateUserInfo"] = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        certificate_name: userData.certificate_name || "",
        certificate_date: userData.certificate_date || "",
      };
      return newState;
    }

    case LEARNING_CERTIFICATE_USER_ERROR: {
      const newState = {
        ...state,
      };

      const errorMsg = action.payload;
      newState.addEditLearningCertificateUser = {
        ...newState.addEditLearningCertificateUser,
        errors: errorMsg,
      };

      return newState;
    }

    default:
      return state;
  }
};
