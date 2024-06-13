import React from "react";
import styles from "./footer.module.scss";
import intelliswift_logo_black from "assets/images/intelliswift-logo-black.png";
import twitter from "assets/images/twitter-logo.png";
import facebook from "assets/images/facebook-logo.png";
import linkedin from "assets/images/linkedin-logo.png";
import instagram from "assets/images/instagram-logo.png";
import youtube from "assets/images/youtube-logo.svg";

export const Footer1: React.FC<any> = () => {
  const imgUrl = `${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`;
  return (
    <section className={styles["footer-section"]}>
      <footer className={styles["footer-main"]}>
        <img src={imgUrl} alt="intelliswift"></img>
      </footer>
    </section>
  );
};

export const Footer2: React.FC<any> = () => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["logo-container"]}>
        <img src={intelliswift_logo_black} alt="Intelliswift Logo" />
      </div>
      <div className={styles["links-container"]}>
        <img className={styles["logo"]} src={facebook} alt="Facebook Logo" />
        <img className={styles["logo"]} src={linkedin} alt="LinkedIn Logo" />
        <img className={styles["logo"]} src={twitter} alt="Twitter Logo" />
        <img className={styles["logo"]} src={instagram} alt="Instagram Logo" />
        <img className={styles["logo"]} src={youtube} alt="YouTube Logo" />
      </div>
    </div>
  );
};
