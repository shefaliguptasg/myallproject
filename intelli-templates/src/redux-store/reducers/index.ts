import { combineReducers } from "redux";
import { IReduxStore } from "../interfaces";
import { modelReducer } from "./modelReducer";
import obReducer from "./obReducer";
import tndReducers from "./tndReducers";
import iTalkReducer from "./iTalkReducer";
import mailerReducer from "./welcomeMailerReducer";
import strapiReducer from "./strapiReducer";
import iBuddyReducer from "./iBuddyReducer";
import sendEmailReducer from "./sendEmailReducer";
import iTalkCertificateFormReducer from "./iTalkCertificateFormReducer";
import iLeapReducers from "./iLeapReducers";
import learningCertificateReducer from "./learningCertificate";
import learningReducer from "./learningReducer";
import wallOfFameReducer from "./wallOfFameReducer";
import teaserReducer from "./teaserReducer";

// NOTE: current type definition of Reducer in 'redux-actions' module
// doesn't go well with redux@4
export const rootReducer = combineReducers<IReduxStore>({
  models: modelReducer as any,
  iTalkId: iTalkReducer as any,
  obId: obReducer as any,
  strapi: strapiReducer as any,
  mailerData: mailerReducer as any,
  iBuddyId: iBuddyReducer as any,
  tndInfo: tndReducers as any,
  iLeapId: iLeapReducers as any,
  teaserInfo: teaserReducer as any,
  //@ts-ignore
  sendEmail: sendEmailReducer as any,
  iTalkCertificate: iTalkCertificateFormReducer as any,
  learningCertificate: learningCertificateReducer as any,
  learningLeague: learningReducer as any,
  wallOfFame: wallOfFameReducer as any,
});
