import React from "react";
import styles from "./iTalkTemplate.module.scss";
import calendar from "../../assets/images/calender-logo.svg";
import { useSelector } from "react-redux";
import CommonFunctions from "utils/commonFunction";
import { getFontUrl } from "utils/generalUtils";
import HorizontalBar from "components/common/horizontalbar/HorizontalBar";

const Main = () => {
  const iTalkData: any = useSelector((state: any) => state.iTalkId.iTalkData);
  const sessionDate = CommonFunctions.formatDateInCustomFormat(iTalkData.date);
  let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
  let profileImgUrl;
  if (iTalkData && iTalkData.profile?.data) {
    profileImgUrl = getFontUrl(
      strapiBaseUrl,
      iTalkData.profile.data.attributes
    );
  }

  return (
    <div className={styles["body"]}>
      <HorizontalBar />
      <div className={styles["main-content"]}>
        <p className={"pdb-15"}>Dear Intellians,</p>

        <p
          className={styles["pg-content"]}
          dangerouslySetInnerHTML={{
            __html: iTalkData.info,
          }}
        ></p>

        <div className={styles["middle-block"]}>
          <div className={styles["person-image"]}>
            <img src={profileImgUrl} alt="Presenter" />
          </div>
          <div className={styles["mid-block-two"]}>
            <div className={styles["mid-block-text"]}>
              <div className={styles["pg-block1"]}>
                <div className={styles["pg1"]}>
                  <span className={styles["presenter"]}>Presenter: </span>
                  <span>{`${iTalkData.first_name} ${iTalkData.last_name}`}</span>
                </div>

                <div
                  className={styles["pg2"]}
                >{`${iTalkData.designation}`}</div>
              </div>

              <div className={styles["horizontal-bar"]}>
                <hr />
              </div>

              <div className={styles["pg-block2"]}>
                <div className={styles["pg3"]}>
                  <span className={styles["topic"]}>Topic: </span>
                  {`${iTalkData.topic_name}`}
                </div>
                <div className={styles["date-time-block"]}>
                  <div className={styles["calender"]}>
                    <img
                      className={styles["calender-logo"]}
                      src={calendar}
                      alt="Calendar"
                    />
                    <div className={styles["date"]}>
                      <span>{sessionDate}</span>
                    </div>
                  </div>
                  <div className={styles["time"]}>
                    <img
                      className={styles["time-logo"]}
                      src={`${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Microsoft_Teams_image_9_0dbbf5fcd7.png`}
                      alt="Time Clock"
                    />
                    <div className={styles["time-value"]}>
                      <span>{`${iTalkData.from} - ${iTalkData.to} IST`}</span>
                    </div>
                  </div>
                </div>
                <div className={styles["eligibility"]}>
                  <p>Eligibility : {`${iTalkData.attendee_text}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className={styles["pg-content"]}>
          In this iTalks Session, {`${iTalkData.first_name}`} will discuss the
          following topics:
        </p>
        <ul>
          {iTalkData.topics.map((item: any) => (
            <li className={styles["list-content"]}>
              <span className={styles["bullet"]}>&#9701;</span> {item}
            </li>
          ))}
        </ul>

        <p
          className={styles["pg-content"]}
          dangerouslySetInnerHTML={{
            __html: iTalkData.join_us,
          }}
        ></p>
        <p className="pdt-20">We hope to see you there!</p>
        <div className="pdt-20">
          <div>
            <span>Best Regards,</span>
          </div>
          <div>
            <strong>Team Talent Development</strong>
          </div>
        </div>
      </div>

      <div className={styles["black-footer"]}></div>
    </div>
  );
};

export default Main;
