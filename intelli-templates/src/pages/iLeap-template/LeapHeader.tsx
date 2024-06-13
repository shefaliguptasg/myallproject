import Header from "components/common/header/Header";
import styles from "./iLeapTemplate.module.scss";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";

const LeapHeader = () => {
  const iLeapData: any = useSelector((state: any) => {
    return state.iLeapId.iLeapData;
  });

  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  let backgroundImageUrl: string | undefined = "";

  if (iLeapData && iLeapData.background_image) {
    backgroundImageUrl = getFontUrl(
      strapiBaseUrl,
      iLeapData.background_image.data.attributes
    );
  }

  const headerLogoUrl =
    "http://template.intelliswift.com:1337/uploads/i_Leap_mailer_3_logo_e3a9a1c55c.png";

  return (
    <Header
      backgroundImgUrl={backgroundImageUrl}
      headerText={iLeapData.header_text}
      logoUrl={headerLogoUrl}
      logoAltText="Leap SVG"
      classname={{
        logoContainerClass: styles.logoContainer,
        logoImageClass: styles.logo_image,
      }}
    />
  );
};

export default LeapHeader;
