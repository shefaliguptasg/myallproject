import {
  SET_TEASER_DATA,
  SET_TEASER_SLIDER,
  SET_ADD_EDIT_TEASER,
} from "../actions/actionConstant";

const initialstate = {
  iLeapId: null,
  teaserData: null,
  showTeaserSlider: false,
  addEditTeaserData: {
    isEdit: false,
    addEditTeaserInfo: {},
  },
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_TEASER_DATA:
      return {
        ...state,
        teaserData: action.payload,
      };
    case SET_TEASER_SLIDER:
      return {
        ...state,
        showTeaserSlider: true,
      };
    case SET_ADD_EDIT_TEASER: {
      const newState = { ...state, addEditTeaserData: {} };
      const userData = action.payload.addEditTeaserInfo;
      newState.addEditTeaserData["isEdit"] = action.payload.isEdit ?? false;
      newState.addEditTeaserData["addEditTeaserInfo"] = {
        id: userData?.id || "",
        backgroundImgUrl: userData?.backgroundImgUrl || "",
        headeLogoImageUrl: userData?.headeLogoImageUrl || "",
        header_text: userData?.header_text || "",
        salutation: userData?.salutation || "",
        signature: userData?.signature || "",
        section: userData?.section || [""],
      };
      return newState;
    }
    default:
      return state;
  }
};
