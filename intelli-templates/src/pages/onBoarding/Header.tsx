import React from "react";
import styles from "./on-boarding.module.scss";
import { useSelector } from "react-redux";
import userIcon from "../../assets/images/userIcon.png";
import { getFontUrl } from "utils/generalUtils";
import HorizontalBar from "components/common/horizontalbar/HorizontalBar";

interface IProps {
  className: string;
}

const Header: React.FC<IProps> = (props) => {
  const artifacts = useSelector((state: any) => state.strapi.artifacts);
  const templateHeaderImage: string = artifacts[props.className];
  //this is data from redux for perticular user featch from use data api
  //use this selector in component to get data of users
  const obData: any = useSelector((state: any) => state.obId.obData);
  let header_logo: string | undefined;
  if (obData) {
    let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
    if (obData) {
      if (obData.profile?.data) {
        header_logo = getFontUrl(strapiBaseUrl, obData.profile.data.attributes);
      }
    }
  }

  return (
    <div className={`${styles[props.className]}`}>
      <div
        className={styles["header-wrapper"]}
        style={{ backgroundImage: `url(${templateHeaderImage})` }}
      >
        <div
          className={`${styles["header-profile"]} ${
            header_logo ? "" : styles["no-img"]
          }`}
        >
          <img
            id="profilePicture"
            src={header_logo ?? userIcon}
            alt="Profile Picture"
          />
          {props.className == "template7" || "template8" || "template9" ? (
            <div className={styles["img-frame"]}></div>
          ) : null}
        </div>
        <div className={styles["header-title"]}>
          <div id={styles["welcomeMessage"]}>{obData.title}</div>
        </div>
      </div>
      <div className={styles["blackBox"]}>
        <div className={styles["blackBox-holder"]}>
          <p id={styles["employeeName"]}>
            {obData.first_name} {obData.last_name}
          </p>
          <p id={styles["designation"]}>{obData.designation}</p>
        </div>
      </div>
      <HorizontalBar />
    </div>
  );
};

export default Header;
