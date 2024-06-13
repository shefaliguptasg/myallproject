import {
  ADD_EDIT_WALL_OF_FAME_USER,
  SET_WALL_OF_FAME_ERRORS,
  CLEAR_WALL_OF_FAME_USER_INFO,
} from "./actionConstant";

export const addEditWallOfFameUser = (wallOfFameUserData: any): any => ({
  type: ADD_EDIT_WALL_OF_FAME_USER,
  payload: wallOfFameUserData,
});

export const setWallOfFameError = (errors: any): any => ({
  type: SET_WALL_OF_FAME_ERRORS,
  payload: errors,
});

export const resetWallOfFameUser = (): any => ({
  type: CLEAR_WALL_OF_FAME_USER_INFO,
});
