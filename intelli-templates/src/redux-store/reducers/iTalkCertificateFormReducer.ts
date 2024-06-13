import {
  SET_ITALK_CERTIFICATE_FORM_ID,
  SET_ITALK_CERTIFICATE_DATA,
  ADD_EDIT_ITALK_CERTIFICATE_USER,
  ITALK_CERTIFICATE_USER_ERROR,
} from "redux-store/actions/actionConstant";

const initialState = {
  iTalkCertificateId: null,
  iTalkCertificateData: null,
  approvalStatus: {},
  addEditiTalkCertificateUser: {
    isEdit: false,
    iTalkCertificateUserInfo: {},
    errors: {},
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_ITALK_CERTIFICATE_FORM_ID:
      return {
        ...state,
        iTalkCertificateId: action.payload,
      };

    case SET_ITALK_CERTIFICATE_DATA:
      return {
        ...state,
        iTalkCertificateData: action.payload,
      };

    case ADD_EDIT_ITALK_CERTIFICATE_USER: {
      let newState = {
        ...state,
        addEditiTalkCertificateUser: {
          ...state.addEditiTalkCertificateUser,
          iTalkCertificateUserInfo: {},
        },
      };
      const userData = action.payload || {};
      if (userData.id) {
        newState.addEditiTalkCertificateUser["isEdit"] = true;
      } else {
        newState.addEditiTalkCertificateUser["isEdit"] = false;
      }

      newState.addEditiTalkCertificateUser["iTalkCertificateUserInfo"] = {
        id: userData.id || "",
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        certificate_name: userData.certificate_name || "",
        certificate_date: userData.certificate_date || "",
      };
      return newState;
    }

    case ITALK_CERTIFICATE_USER_ERROR: {
      let newState = {
        ...state,
      };

      const errorMsg = action.payload;
      newState.addEditiTalkCertificateUser = {
        ...newState.addEditiTalkCertificateUser,
        errors: errorMsg,
      };

      return newState;
    }

    default:
      return state;
  }
};
