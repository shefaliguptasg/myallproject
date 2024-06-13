import React, { FC } from "react";
import iTalk_svg from "../../assets/images/italk-logo.svg";
import styles from "./iTalkTemplate.module.scss";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";
import Header from "components/common/header/Header";

const ITalkHeader: FC = () => {
  const iTalkData: any = useSelector((state: any) => state.iTalkId.iTalkData);
  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  let backgroundImgUrl: string | undefined;
  if (iTalkData && iTalkData.profile?.data) {
    backgroundImgUrl = getFontUrl(
      strapiBaseUrl,
      iTalkData.background.data.attributes
    );
  }

  return (
    <Header backgroundImgUrl={backgroundImgUrl!} headerText={iTalkData?.title}>
      <>
        <div className={styles["logo-container"]}>
          {/* Intelliswift Logo */}
          <img
            id={styles["is-logo"]}
            src={`${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`}
            alt="Intelliswift Logo"
          />

          {/* Vertical Pipe between the two Logos */}
          <div className={styles["vertical-pipe"]}></div>

          <img id={styles["italk-logo"]} src={iTalk_svg} alt="iTalk SVG" />
        </div>

        {/* Texts inside the header */}
        <div className={styles["header-text"]}>iTalk Session on</div>
      </>
    </Header>
  );
};
export default ITalkHeader;
