import React from "react";
import styles from "./italk.module.scss";
import { useSelector } from "react-redux";

const Main = () => {
  const iTalkCertificateData: any = useSelector(
    (state: any) => state.iTalkCertificate.addEditiTalkCertificateUser
  );

  const { first_name, last_name, certificate_name } =
    iTalkCertificateData.iTalkCertificateUserInfo;

  return (
    <div className={styles["certificate-italk-main"]}>
      <div className={styles["certificate-achivement"]}>
        <p id={styles["certification-text"]}>CERTIFICATE</p>
        <p id={styles["achivement-text"]}>OF ACHIEVEMENT</p>
      </div>
      <div className={styles["main-content"]}>
        <p className="font-26 mgb-5">This certificate is presented to</p>
        <p className={styles["certificate-person-name"]}>
          {first_name + " " + last_name}
        </p>
        <p style={{ fontSize: "22px" }}>
          for sharing his/her valuable knowledge as a speaker on the topic
        </p>
        <p className={styles["certificate-session-name"]}>{certificate_name}</p>
      </div>
    </div>
  );
};

export default Main;
