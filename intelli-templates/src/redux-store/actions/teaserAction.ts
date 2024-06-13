import {
  SET_ADD_EDIT_TEASER,
  SET_TEASER_DATA,
  SET_TEASER_SLIDER,
} from "./actionConstant";

export interface setTeaserDataPayload {
  salutation: string;
  header_text: string;
  background_imange: string;
  section: object;
  signature: string;
}

export interface SetTeaserDataAction {
  type: "SET_TEASER_DATA";
  payload: setTeaserDataPayload;
}
export interface SetTeaserSliderAction {
  type: "SET_TEASER_SLIDER";
  payload: boolean;
}
export const setTeaserData = (
  teaserData: setTeaserDataPayload
): SetTeaserDataAction => ({
  type: SET_TEASER_DATA,
  payload: teaserData,
});

export const setTeaserSlider = (
  isTeaserSlider: boolean
): SetTeaserSliderAction => ({
  type: SET_TEASER_SLIDER,
  payload: isTeaserSlider,
});

export const setAddEditTeaserData = (addEditTeaserData: any) => ({
  type: SET_ADD_EDIT_TEASER,
  payload: addEditTeaserData,
});
