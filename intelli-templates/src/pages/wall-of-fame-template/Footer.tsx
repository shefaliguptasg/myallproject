import React from "react";
import { ReactComponent as Quote } from "../../assets/images/quote.svg";
import styles from "./wallOfFameTemplate.module.scss";
function Footer() {
  return (
    <div className={styles["quote-container"]}>
      <Quote className={styles["quote-icon"]} />
      <div className={styles["footer-container"]}>
        <p>
          "Learning is not attained by chance, it must be sought for with ardor
          and diligence."
        </p>
        <span>-Abigal Adams</span>
      </div>
      <h3>Happy Learning!</h3>
      <div className={styles["linking"]}>
        <p>
          For any queries related to certifications, please feel free to reach
          out to
          <a href="https://forms.office.com/pages/responsepage.aspx?id=1BHPiZ0Hpkevk-auZM60LBAKFggpTuFFmeUtjU84qwBUMlExNkdFVDVSUlNHTjVCOFFQRkRTUzFaVC4u">
            td_india@intelliswift.com
          </a>
        </p>
      </div>
      <div className={styles["logo-container"]}>
        <img
          src={`${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`}
          alt="Intelliswift Logo"
        />
      </div>
    </div>
  );
}

export default Footer;
