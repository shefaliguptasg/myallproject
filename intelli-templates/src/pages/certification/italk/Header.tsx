import React from "react";
import intelliswiftLogo from "../../../assets/images/intelliswift-logo-black.png";
import iTalkLogo from "../../../assets/images/italk-black-logo.svg";
import styles from "./italk.module.scss";

const Header = () => {
  return (
    <div className={styles["certificate-italk-header"]}>
      <img
        className={styles["intelliswift-logo"]}
        src={intelliswiftLogo}
        alt="intelliswift logo"
      />
      <span className={styles["vertical-bar"]} />
      <img
        className={styles["italk-logo"]}
        src={iTalkLogo}
        alt="italk black logo"
      />
    </div>
  );
};

export default Header;
