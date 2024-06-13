import React from "react";
import styles from "./wallOfFameTemplate.module.scss";
import leafImg from "../../assets/images/leaf-head-img.png";
import { useSelector } from "react-redux";
function Header() {
  const fameData = useSelector(
    (state: any) => state.wallOfFame.wallOfFameUserInfo
  );

  return (
    <>
      <div className={styles["header-container"]}>
        <div className={styles["icon-container"]}>
          <img
            src={leafImg}
            className={styles["leaf-icon"]}
            alt="golden-leaf"
          />
          <p className={styles["title-text"]}>
            {` Wall Of Fame Certification Achievers Of ${fameData.quarter_year}`}
          </p>
        </div>
      </div>
      <div className={styles["text-container"]}>
        <p>
          Congratulations to our associates for completing their certifications!
        </p>
      </div>
    </>
  );
}

export default Header;
