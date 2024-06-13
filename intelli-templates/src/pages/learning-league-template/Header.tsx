import React from "react";
import styles from "./learningLeague.module.scss";

const imgUrl = `${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`;
const backgroundImg =
  "http://template.intelliswift.com:1337/uploads/Microsoft_Teams_image_7_92f6ac288c.png";
const Header = () => {
  return (
    <div className={styles["header-container"]}>
      <div>
        <img src={backgroundImg} className={styles["backgroundImg-box"]} />
      </div>
      <div className={styles["header-holder"]}>
        <img src={imgUrl} className={styles["header-img"]} />
      </div>
      <div className={styles["header-bottom"]}>
        <h1 className={styles["header-title"]}>LEARNING LEAGUE</h1>
        <p className={styles["board-text"]}>2023 Leaderboard</p>
      </div>
    </div>
  );
};
export default Header;
