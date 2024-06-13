import {
  ADD_EDIT_LEARNING_USER,
  SET_VALIDATION_ERRORS,
  CLEAR_LEARNING_USER_INFO,
} from "./actionConstant";

export const addEditLearningUser = (learningUserData: any): any => ({
  type: ADD_EDIT_LEARNING_USER,
  payload: learningUserData,
});

export const setValidationErrors = (errors: any) => ({
  type: SET_VALIDATION_ERRORS,
  payload: errors,
});

export const resetLearningUser = (): any => ({
  type: CLEAR_LEARNING_USER_INFO,
});
