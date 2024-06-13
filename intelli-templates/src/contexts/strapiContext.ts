import { createTheme } from "@mui/material";
import {
  getBaseUrl,
  getClientName,
  getFonts,
  getFontUrl,
  getSettings,
} from "../utils/generalUtils";
import { GQLConstants, graphQlCall } from "../utils/graphQLUtils";
import { Queries } from "graphQL/gQLConstants";
import { StrapiHeader } from "contexts/interfaces";

const clientName = getClientName();

export const GetGlobalData = async () => {
  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  const strapiHeader: StrapiHeader = {
    Authorization: `Bearer ${process.env.REACT_APP_STRAPI_APIKEY}`,
  };

  const {
    data: {
      artifacts: {
        data: [artifactsData],
      },
      brandings: {
        data: [themeData],
      },
      welcomeMailers: {
        data: [welcomeMailersData],
      },
      commsErrors: {
        data: [errorData],
      },
    },
  }: any = await graphQlCall(
    GQLConstants.QUERY,
    Queries.GET_BRANDING_DATA,
    {
      clientName: clientName,
    },
    `${process.env.REACT_APP_STRAPI_GQL_URL}`,
    strapiHeader
  );

  const strapiArtifacts = artifactsData.attributes;

  const artifacts: any = {};

  if (strapiArtifacts && Object.keys(strapiArtifacts)) {
    Object.keys(strapiArtifacts).forEach((key) => {
      if (
        strapiArtifacts[key] &&
        Object.keys(strapiArtifacts[key]) &&
        Object.keys(strapiArtifacts[key]).length &&
        strapiArtifacts[key]["data"]
      ) {
        if (key !== "onbordingHeaderImages") {
          artifacts[key] = getBaseUrl(
            strapiBaseUrl,
            strapiArtifacts[key]["data"]["attributes"]["url"]
          );
        } else {
          const onbordingHeaderImages = strapiArtifacts[key]["data"];
          Object.keys(onbordingHeaderImages).forEach((key) => {
            const templateKey = onbordingHeaderImages[
              key
            ].attributes.name.slice(0, 9);
            artifacts[templateKey] = getBaseUrl(
              strapiBaseUrl,
              onbordingHeaderImages[key].attributes.url
            );
          });
        }
      }
    });
  }
  const defaultTheme = themeData.attributes;
  const error = errorData.attributes.commsError;
  const welcomeMailers = welcomeMailersData.attributes;

  const themeRes = defaultTheme;
  const fonts = getFonts(strapiBaseUrl, themeRes.fonts);
  const newFonts = fonts.map((cur) => {
    return {
      "@font-face": cur,
    };
  });
  const theme = {
    ...themeRes,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          fallbacks: newFonts,
        },
      },
    },
    spacing: (factor: any) => `${themeRes.spacingValue * factor}rem`,
  };
  delete theme.fonts;
  delete theme.overrides;
  const muiTheme = createTheme(theme);
  window["muiTheme"] = muiTheme;

  let emp_image, emp_hobby_img;
  if (welcomeMailers) {
    if (welcomeMailers.welcome_mailer_data.emp_image) {
      emp_image = getFontUrl(
        strapiBaseUrl,
        welcomeMailers.welcome_mailer_data.emp_image.data.attributes
      );
      delete welcomeMailers.welcome_mailer_data.emp_image;
    }
    if (welcomeMailers.welcome_mailer_data.emp_hobby_img) {
      emp_hobby_img = getFontUrl(
        strapiBaseUrl,
        welcomeMailers.welcome_mailer_data.emp_hobby_img.data.attributes
      );
      delete welcomeMailers.welcome_mailer_data.emp_hobby_img;
    }
  }
  welcomeMailers["emp_image"] = emp_image;
  welcomeMailers["emp_hobby_img"] = emp_hobby_img;

  return {
    theme: muiTheme,
    artifacts,
    error,
    welcomeMailers,
  };
};
