import React from "react";
import styles from "./appreciation.module.scss";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";

function Main() {
  const tndData = useSelector((state: any) => state.tndInfo.tndData);
  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  let profileImgUrl;
  if (tndData && tndData.profile?.data) {
    profileImgUrl = getFontUrl(strapiBaseUrl, tndData.profile.data.attributes);
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["main-container"]}>
        {/* Main Left Container */}
        <div className={styles["main-left-container"]}>
          <div className="salutation">
            <p>
              Hi{" "}
              <strong>{`${tndData.first_name} ${tndData.last_name}`},</strong>
            </p>
          </div>
          {tndData.td_section.map((cur: string) => {
            return (
              <div className={styles["paragraph-gap"]}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: cur,
                  }}
                ></p>
              </div>
            );
          })}
          <div className={styles["paragraph-gap"]}>
            <p>Best wishes,</p>
            <p>Team Talent Development</p>
          </div>
        </div>

        {/* Main Right Container */}
        <div className={styles["main-right-container"]}>
          <img
            className={styles["profile-image-container"]}
            src={profileImgUrl}
            alt="Employee Picture"
          />
          <div className={styles["employee-name-designation-container"]}>
            <div className={styles["employee-name"]}>
              <strong>{`${tndData.first_name} ${tndData.last_name}`}</strong>
            </div>
            <div className={"font-14"}>{tndData.designation}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
