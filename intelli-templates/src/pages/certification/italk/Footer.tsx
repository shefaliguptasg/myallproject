import React from "react";
import styles from "./italk.module.scss";
import sign from "../../../assets/images/certificate-iTalk-sign.jpg";
import { useSelector } from "react-redux";
import moment from "moment";

const Footer = () => {
  const iTalkCertificateData: any = useSelector(
    (state: any) => state.iTalkCertificate.addEditiTalkCertificateUser
  );
  const { certificate_date } = iTalkCertificateData.iTalkCertificateUserInfo;
  const newDateFormate = (date: string) => {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj.format("DD-MM-YYYY");
  };
  return (
    <div className={styles["certificate-italk-footer"]}>
      <div className={styles["footer-left-content"]}>
        <p className={styles["left-content-date"]}>
          {newDateFormate(certificate_date)}
        </p>
        <p className={styles["name-stamp"]}>Date</p>
      </div>
      <div className={styles["footer-right-content"]}>
        <span className={styles["right-content-sign"]}>
          <img src={sign} alt="sign" className="signature" />
        </span>
        <p className={styles["name-stamp"]}>
          Prakash Kumar Palaniswamy,
          <br />{" "}
          <span style={{ fontSize: "0.925rem" }}>Head, Talent Development</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
