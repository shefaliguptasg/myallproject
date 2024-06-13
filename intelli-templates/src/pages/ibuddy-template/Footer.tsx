import React from "react";
import styles from "./iBuddyTemplate.module.scss";
import intelliswift_logo_black from "../../assets/images/intelliswift-logo-black.png";
import twitter from "../../assets/images/twitter-logo.png";
import facebook from "../../assets/images/facebook-logo.png";
import linkedin from "../../assets/images/linkedin-logo.png";
import instagram from "../../assets/images/instagram-logo.png";
import youtube from "../../assets/images/youtube-logo.svg";
import HorizontalBar from "components/common/horizontalbar/HorizontalBar";

const Footer = () => {
  return (
    <div className={styles["footer-container"]}>
      <div className={styles["seperator"]}>
        <hr></hr>
      </div>
      <div className={styles["footer-main"]}>
        <div className={styles["logo-container"]}>
          <img src={intelliswift_logo_black} alt="Intelliswift Logo" />
        </div>
        <div className={styles["social-media-container"]}>
          <p className={styles["container-label"]}>Connect with us</p>

          <div className={styles["links-container"]}>
            <img className={styles["logo"]} src={facebook} />

            <img className={styles["logo"]} src={linkedin} />

            <img className={styles["logo"]} src={twitter} />

            <img className={styles["logo"]} src={instagram} />

            <img className={styles["logo"]} src={youtube} />
          </div>
        </div>
      </div>
      <HorizontalBar />
    </div>
  );
};

export default Footer;
