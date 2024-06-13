import HttpClient from "./http";
import { Settings } from "models/settings";
import { store } from "redux-store/index";
import Artifacts from "models/artifactsModel";

const customStore: any = store;

export const getSettings = async () => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const settingURL = `${baseUrl}/settings.json`;
  const httpClient = new HttpClient();

  const settingsResponse = await httpClient.get(settingURL);
  if (settingsResponse && settingsResponse.data) {
    window["ui-settings"] = settingsResponse.data;
    return settingsResponse.data;
  }
  return null;
};

export const getClientName = () => {
  return process.env.REACT_APP_CLIENT_NAME
    ? process.env.REACT_APP_CLIENT_NAME.trim()
    : "";
};

export const getArtifactsFromStore = () => {
  if (
    Artifacts.list(customStore.getState()) &&
    Artifacts.list(customStore.getState()).length &&
    Artifacts.list(customStore.getState())[0][1].props &&
    Artifacts.list(customStore.getState())[0][1].props.artifacts
  ) {
    return Artifacts.list(customStore.getState())[0][1].props.artifacts;
  }
};

export const getSettingsFromStore = (key: any) => {
  if (
    Settings.list(customStore.getState()) &&
    Settings.list(customStore.getState()).length &&
    Settings.list(customStore.getState())[0].props &&
    Settings.list(customStore.getState())[0].props.clientDetails &&
    Settings.list(customStore.getState())[0].props.clientDetails.tenantId
  ) {
    return Settings.list(customStore.getState())[0].props.clientDetails[key];
  }
};

export const getFonts = (baseUrl: string, fontObj: object) => {
  let regularFontUrl = null;
  let boldFontUrl = null;
  let semiBoldFontUrl = null;
  let headLineRegularFontUrl = null;
  let headLineBoldFontUrl = null;
  let otherFontUrl = null;

  if (fontObj["regular"].data.attributes != null) {
    regularFontUrl = getFontUrl(baseUrl, fontObj["regular"].data.attributes);
  }

  if (fontObj["bold"].data.attributes != null) {
    boldFontUrl = getFontUrl(baseUrl, fontObj["bold"].data.attributes);
  }

  if (fontObj["semibold"].data.attributes != null) {
    semiBoldFontUrl = getFontUrl(baseUrl, fontObj["semibold"].data.attributes);
  }

  if (fontObj["headline_bold"].data != null) {
    headLineRegularFontUrl = getFontUrl(
      baseUrl,
      fontObj["headline_bold"].data.attributes
    );
  }

  if (fontObj["headline_bold"].data != null) {
    headLineBoldFontUrl = getFontUrl(
      baseUrl,
      fontObj["headline_bold"].data.attributes
    );
  }

  if (fontObj["other"].data != null) {
    otherFontUrl = getFontUrl(baseUrl, fontObj["other"].data.attributes);
  }

  const regularFont = {
    fontFamily: "regular",
    src: `
        local('OpenSans-regular'),
        local('OpenSans'),
        url(${regularFontUrl}) format('truetype')
      `,
  };

  const bold = {
    fontFamily: "bold",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        url(${boldFontUrl}) format('truetype'),
        local('OpenSans-Bold'),
        local('OpenSans-Bold')
      `,
  };

  const semiBold = {
    fontFamily: "semi-bold",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        url(${semiBoldFontUrl}) format('truetype'),
        local('OpenSans-SemiBold'),
        local('OpenSans-Bold')
      `,
  };

  const headLineRegular = {
    fontFamily: "headline-regular",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        url(${headLineRegularFontUrl}) format('truetype'),
        local('OpenSans-SemiBold'),
        local('OpenSans-Bold')
      `,
  };

  const headLineBold = {
    fontFamily: "headline-bold",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        url(${headLineBoldFontUrl}) format('truetype'),
        local('OpenSans-SemiBold'),
        local('OpenSans-Bold')
      `,
  };

  const other = {
    fontFamily: "other",
    fontStyle: "normal",
    fontWeight: "normal",
    src: `
        url(${otherFontUrl}) format('truetype'),
        local('OpenSans-SemiBold'),
        local('OpenSans-Bold')
      `,
  };

  return [
    regularFont,
    bold,
    semiBold,
    headLineBold,
    headLineRegular,
    headLineBold,
    other,
  ];
};

export const getFontUrl = (baseUrl: string, obj: object) => {
  if (baseUrl != null) {
    let updatedUrl = "";
    obj = {
      ...obj,
      url: `${baseUrl + obj["url"]}`,
    };
    updatedUrl = obj["url"];
    return updatedUrl;
  }
};

export const getBaseUrl = (baseUrl: string, url: string) => {
  if (baseUrl != null) {
    let updatedUrl = "";
    updatedUrl = `${baseUrl + url}`;
    return updatedUrl;
  }
};

type NestedObject = { [key: string]: any };
export const getNestedObjectsByKey = (
  arr: NestedObject[],
  key: any,
  nestedKey: any
): NestedObject[] => {
  const result: NestedObject[] = [];
  for (const obj of arr) {
    if (key in obj && nestedKey in obj[key]) {
      result.push(obj[key][nestedKey]);
    }
  }
  return result;
};
