import React from "react";
import styles from "./iBuddyTemplate.module.scss";
import { getFontUrl } from "utils/generalUtils";
import { useSelector } from "react-redux";

const Header = (props: any) => {
  const buddyUserData = useSelector((state: any) => state.iBuddyId.iBuddyData);
  let buddyBackground, joineeBackground;
  if (buddyUserData) {
    let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
    if (buddyUserData) {
      if (buddyUserData.buddy_background?.data) {
        buddyBackground = getFontUrl(
          strapiBaseUrl,
          buddyUserData.buddy_background.data.attributes
        );
      }
      if (buddyUserData.joinee_background?.data) {
        joineeBackground = getFontUrl(
          strapiBaseUrl,
          buddyUserData.joinee_background.data.attributes
        );
      }
    }
  }
  return (
    <div className={styles["header-container"]}>
      <img
        src={
          props.templateType === "joinee" ? buddyBackground : joineeBackground
        }
        alt="Header Banner"
      />
    </div>
  );
};

export default Header;
