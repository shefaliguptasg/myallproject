import React from "react";
import intelliswiftLogo from "../../../assets/images/intelliswift-logo-black.png";
import styles from "./learningCertificate.module.scss";
import moment from "moment";
import sign from "../../../assets/images/certificate-iTalk-sign.jpg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const LearningTemplate = () => {
  const learningCertificateUserData: any = useSelector(
    (state: any) => state.learningCertificate.addEditLearningCertificateUser
  );
  const { learningId } = useParams();

  const { first_name, last_name, certificate_name, certificate_date } =
    learningCertificateUserData.learningCertificateUserInfo;

  const newDateFormate = (date: string) => {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj.format("Do MMM'YY");
  };

  return (
    <>
      <div className={styles["certificate-learning-header"]}>
        <img
          className={styles["intelliswift-logo"]}
          src={intelliswiftLogo}
          alt="intelliswift logo"
        />
      </div>
      <div className={styles["certificate-learning-main"]}>
        {learningId == "learning1" ? (
          <div className={styles["certificate-achivement"]}>
            <p id={styles["certification-text"]}>CERTIFICATE</p>
            <p id={styles["achivement-text"]}>OF COMPLETION</p>
          </div>
        ) : (
          <div className={styles["certificate-achivement"]}>
            <p id={styles["certification-text-second"]}>
              CERTIFICATE OF COMPLETION
            </p>
          </div>
        )}
        <div className={styles["main-content"]}>
          <p style={{ fontSize: "17px", color: "#454646" }} className="mgb-20">
            This certificate is presented to
          </p>
          <p className={styles["certificate-person-name"]}>
            {first_name + " " + last_name}
          </p>
          <div className={styles["divider"]}></div>
          <p style={{ fontSize: "17px", color: "#454646" }}>
            for successfully completing
          </p>
          <p className={styles["certificate-session-name"]}>
            {certificate_name}
            AWS
          </p>
          <p className={styles["left-content-date"]}>
            on the {newDateFormate(certificate_date)}
          </p>
        </div>
      </div>
      <div className={styles["certificate-learning-footer"]}>
        <div className={styles["footer-left-content"]}>
          <p className={styles["congo-text"]}>congratulations</p>
        </div>
        <div className={styles["footer-right-content"]}>
          <span className={styles["right-content-sign"]}>
            <img src={sign} alt="sign" className="signature" />
          </span>
          <p className={styles["name-stamp"]}>
            Prakash Kumar Palaniswamy,
            <br />{" "}
            <span style={{ fontSize: "0.925rem", fontFamily: "regular" }}>
              Head, Talent Development
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LearningTemplate;
