import {
  ERROR_STRAPI,
  SAVE_STRAPI,
  SET_LOADER,
  UPLOAD_IMAGE,
  SET_ITALK_SLIDER,
  SET_LEARNING_SLIDER,
  SET_SLIDER,
  SET_IBUDDY_SLIDER,
  SET_TND_SLIDER,
  SET_ITALK_CERTIFICATE_FORM_SLIDER,
  SET_ILEAP_SLIDER,
  SET_LEARNING_CERTIFICATE_SLIDER,
  SET_TEASER_SLIDER,
  SET_WALLOFFAME_SLIDER,
} from "redux-store/actions/actionConstant";

const initialState = {
  onboarding: null,
  error: null,
  welcomeMailers: null,
  loader: false,
  showSlider: false,
  showTndSlider: false,
  showLearningSlider: false,
  showIBuddySlider: false,
  showItalkCertificateSlider: false,
  showILeapSlider: false,
  showLearningCertificateSlider: false,
  showWallOfFameSlider: false,
  showTeaserSlider: false,
  imgInfo: "",
};
export default (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_STRAPI:
      return {
        ...state,
        ...action.payload,
      };

    case ERROR_STRAPI:
      return {
        ...state,
        error: action.payload,
      };

    case SET_LOADER:
      return {
        ...state,
        loader: action.payload,
      };

    case SET_SLIDER:
      return {
        ...state,
        showSlider: action.payload,
      };
    case SET_TND_SLIDER:
      return {
        ...state,
        showTndSlider: action.payload,
      };
    case SET_ITALK_SLIDER:
      return {
        ...state,
        showItalkSlider: action.payload,
      };
    case SET_IBUDDY_SLIDER:
      return {
        ...state,
        showIBuddySlider: action.payload,
      };
    case SET_LEARNING_SLIDER:
      return {
        ...state,
        showLearningSlider: action.payload,
      };
    case UPLOAD_IMAGE: {
      return {
        ...state,
        imgInfo: action.payload,
      };
    }
    case SET_ITALK_CERTIFICATE_FORM_SLIDER:
      return {
        ...state,
        showItalkCertificateSlider: action.payload,
      };
    case SET_ILEAP_SLIDER:
      return {
        ...state,
        showILeapSlider: action.payload,
      };
    case SET_TEASER_SLIDER:
      return {
        ...state,
        showTeaserSlider: action.payload,
      };

    case SET_LEARNING_CERTIFICATE_SLIDER:
      return {
        ...state,
        showLearningCertificateSlider: action.payload,
      };
    case SET_WALLOFFAME_SLIDER:
      return {
        ...state,
        showWallOfFameSlider: action.payload,
      };

    default:
      return state;
  }
};
