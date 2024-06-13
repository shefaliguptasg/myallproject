import {
  ERROR_STRAPI,
  SAVE_STRAPI,
  SET_LOADER,
  SET_SLIDER,
  SET_IBUDDY_SLIDER,
  SET_TND_SLIDER,
  SET_ITALK_SLIDER,
  ITALK_IMAGE,
  SET_ITALK_CERTIFICATE_FORM_SLIDER,
  SET_ILEAP_SLIDER,
  SET_LEARNING_CERTIFICATE_SLIDER,
  SET_LEARNING_SLIDER,
  SET_WALLOFFAME_SLIDER,
  SET_TEASER_SLIDER,
} from "./actionConstant";

export const setStrapi = (obId: any): any => ({
  type: SAVE_STRAPI,
  payload: obId,
});
export const errorStrapi = (obId: any): any => ({
  type: ERROR_STRAPI,
  payload: obId,
});

export const setLoader = (status: any): any => ({
  type: SET_LOADER,
  payload: status,
});

export const setSlider = (status: any): any => ({
  type: SET_SLIDER,
  payload: status,
});

export const setTndSlider = (status: any): any => ({
  type: SET_TND_SLIDER,
  payload: status,
});

export const setItalkSlider = (status: any): any => ({
  type: SET_ITALK_SLIDER,
  payload: status,
});

export const UploadImage = (img: any): any => ({
  type: "UPLOAD_IMAGE",
  payload: img,
});

export const setIBuddySlider = (status: any): any => ({
  type: SET_IBUDDY_SLIDER,
  payload: status,
});

export const setCertificateSlider = (status: any): any => ({
  type: SET_ITALK_CERTIFICATE_FORM_SLIDER,
  payload: status,
});

export const setILeapSlider = (status: any): any => ({
  type: SET_ILEAP_SLIDER,
  payload: status,
});
export const setLearningCertificateSlider = (status: any): any => ({
  type: SET_LEARNING_CERTIFICATE_SLIDER,
  payload: status,
});

export const setLearningSlider = (status: any): any => ({
  type: SET_LEARNING_SLIDER,
  payload: status,
});

export const setWallOfFameSlider = (status: any): any => ({
  type: SET_WALLOFFAME_SLIDER,
  payload: status,
});
export const setTeaserSlider = (status: any): any => ({
  type: SET_TEASER_SLIDER,
  payload: status,
});
