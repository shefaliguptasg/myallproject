import React, { useContext } from "react";
import styles from "./welcomeMailer.module.scss";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";

const Main: React.FC<any> = (props) => {
  let welcomeMailers = useSelector(
    (state: any) => state.mailerData.mailerUserData
  );

  type imgVariable = string | undefined;

  let profileImg: imgVariable, hobbyImg: imgVariable;

  if (welcomeMailers) {
    let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
    if (welcomeMailers) {
      if (welcomeMailers.welcome_mailer_data.emp_image) {
        profileImg = getFontUrl(
          strapiBaseUrl,
          welcomeMailers.welcome_mailer_data.emp_image.data.attributes
        );
      }
      if (welcomeMailers.welcome_mailer_data.emp_hobby_img) {
        hobbyImg = getFontUrl(
          strapiBaseUrl,
          welcomeMailers.welcome_mailer_data.emp_hobby_img.data.attributes
        );
      }
    }
  }

  welcomeMailers = welcomeMailers.welcome_mailer_data;

  return (
    <>
      <div className={styles["main-content"]}>
        <div className={styles["content-wrapper"]}>
          <div className={styles["about-info"]}>
            <p>
              <i>Dear Associates,</i>
            </p>
            <p>{welcomeMailers.section_one}</p>
            <p>{welcomeMailers.section_two}</p>
          </div>

          <div className={styles["img-content-section"]}>
            <div className={styles["img-content-profile"]}>
              <figure>
                <img
                  id="profilePicture"
                  src={profileImg}
                  alt="Profile Picture"
                />
                <figcaption>Sreejith Chandran</figcaption>
              </figure>
            </div>
            <div className={styles["img-data-content"]}>
              <p>{welcomeMailers.section_three}</p>
              <p>{welcomeMailers.section_four}</p>
            </div>
          </div>
        </div>

        <div className={styles["banner-section"]}>
          <div className={styles["header-content"]}>
            <p>{welcomeMailers.section_five}</p>
          </div>
          <div className={styles["header-profile"]}>
            <img id="profilePicture" src={hobbyImg} alt="Profile Picture" />
            {props.className == "template7" || "template8" || "template9" ? (
              <div className={styles["img-frame"]}></div>
            ) : null}
          </div>
        </div>
        <div className={styles["content-wrapper"]}>
          <p className={styles["emp-contact-content join-wrap"]}>
            <i>
              Please join us in welcoming Sreejith to the Intelliswift family
              and wishing him all the best in this
            </i>
          </p>

          <div className={styles["social-btn"]}>
            <a href={welcomeMailers.social_link}>
              Connect with Sreejith on Linkedin
            </a>
          </div>

          <p className={styles["salutation"]}>
            <b>Warm Regards,</b>
            <br />
            <b> Human Resource</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default Main;
