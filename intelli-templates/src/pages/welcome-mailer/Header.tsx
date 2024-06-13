import React, { useContext } from "react";
// import { url } from "inspector";
import styles from "./welcomeMailer.module.scss";
import { useSelector } from "react-redux";

const Header: React.FC = (props) => {
  let welcomeMailers = useSelector(
    (state: any) => state.mailerData.mailerUserData
  );
  welcomeMailers = welcomeMailers.welcome_mailer_data;
  return (
    <div className={styles["main-header"]}>
      <div className={styles["color-box"]}>
        <div id={styles["redBox"]}></div>
        <div id={styles["yellowBox"]}></div>
        <div id={styles["pinkBox"]}></div>
        <div id={styles["blueBox"]}></div>
        <div id={styles["greenBox"]}></div>
      </div>

      <div className={styles["content-wrapper"]}>
        <div className={styles["header-wrapper"]}>
          <div className={styles["header-title"]}>
            <div id={styles["welcomeMessage"]}>Warm Welcome to</div>
          </div>
          <div className={styles["blackBox"]}>
            <p id={styles["employeeName"]}>{welcomeMailers.emp_name}</p>
          </div>

          <div className={styles["blackBox-holder"]}>
            <p id={styles["designation"]}>{welcomeMailers.emp_designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
