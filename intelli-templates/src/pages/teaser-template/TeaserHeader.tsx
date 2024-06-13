import styles from "./teaserTemplate.module.scss";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";
import Header from "components/common/header/Header";

const TeaserHeader = () => {
  const teaserData: any = useSelector(
    (state: any) => state.teaserInfo.teaserData
  );
  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  let backgroundImgUrl: string = getFontUrl(
    strapiBaseUrl,
    teaserData.background_image.data.attributes
  )!;
  console.log("teaserDtat", teaserData);
  let headerLogoUrl = getFontUrl(
    strapiBaseUrl,
    teaserData.header_logo.data.attributes
  );

  return (
    <Header
      backgroundImgUrl={backgroundImgUrl}
      headerText={teaserData.header_text}
      logoUrl={headerLogoUrl}
      logoAltText="Teaser SVG"
      classname={{
        logoContainerClass: styles.logoContainer,
        logoImageClass: styles.logo_image,
      }}
    ></Header>
  );
};

export default TeaserHeader;
