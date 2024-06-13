import React from "react";
import styles from "./learningLeague.module.scss";
import { ReactComponent as QuoteLeft } from "../../assets/images/quote-left.svg";
import { ReactComponent as QuoteRight } from "../../assets/images/quote-right.svg";
import { useSelector } from "react-redux";

const LearningLeagueMain = () => {
  const learningData = useSelector(
    (state: any) => state.learningLeague.learningUserInfo
  );

  const isEven = learningData.userData.length % 2 === 0;

  return (
    <div className={styles["wrapper-container"]}>
      <div className={styles["main-container"]}>
        <p className={styles["main-text"]}>Hi Intellians,</p>

        {learningData.sectionData.map((section: any, index: number) => (
          <p className={styles["para-one"]} key={index}>
            {section}
          </p>
        ))}
      </div>

      <div className={styles["table-struct"]}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>No. Of Courses Completed</th>
            </tr>
          </thead>
          <tbody>
            {learningData.userData.map((user: any, index: number) => (
              <tr key={index}>
                <td>{user.emp_name}</td>
                <td>{user.courses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles["exp-text"]}>
        <p className={styles["three-para"]}>
          <a href="https://forms.office.com/pages/responsepage.aspx?id=1BHPiZ0Hpkevk-auZM60LBAKFggpTuFFmeUtjU84qwBUMlExNkdFVDVSUlNHTjVCOFFQRkRTUzFaVC4u">
            Here is what our champions say about their experince
          </a>
        </p>
      </div>
      <div className={styles["card"]}>
        {learningData.userData
          .slice(
            0,
            isEven
              ? learningData.userData.length
              : learningData.userData.length - 1
          )
          .map((carddata: any, index: number) => (
            <div className={styles["card-box"]} key={index}>
              <span className={styles["quote-left-holder"]}>
                <QuoteLeft />
              </span>
              <div className={styles["img-box"]}>
                <img
                  src={`http://template.intelliswift.com:1337${carddata.image}`}
                  className={styles["profile-img"]}
                />
              </div>
              <div className={styles["cardbox-content"]}>
                <p className={styles["card-text"]}>{carddata.description}</p>
                <strong>{carddata.emp_name}</strong>
              </div>
              <span className={styles["quote-right-holder"]}>
                <QuoteRight />
              </span>
            </div>
          ))}
      </div>

      {!isEven && (
        <div className={styles["horizontal-card-box"]}>
          <span className={styles["quote-left-holder"]}>
            <QuoteLeft />
          </span>
          <div className={styles["img-box"]}>
            <img
              src={`http://template.intelliswift.com:1337${
                learningData.userData[learningData.userData.length - 1].image
              }`}
              className={styles["profile-card-img"]}
            />
          </div>
          <p className={styles["card-box-text"]}>
            {
              learningData.userData[learningData.userData.length - 1]
                .description
            }
          </p>
          <strong className={styles["profile-name"]}>
            {learningData.userData[learningData.userData.length - 1].emp_name}
          </strong>
          <span className={styles["quote-right-holder"]}>
            <QuoteRight />
          </span>
        </div>
      )}

      <div className={styles["text-wrapper"]}>
        <p className={styles["congo-text"]}>
          Congratulations once again to our accomplished Intelliens!
        </p>
        <p className={styles["learn-text"]}>
          Inspire to embark on your learning journey?
        </p>
        <div className={styles["res-text"]}>
          <h3>
            <a href="https://forms.office.com/pages/responsepage.aspx?id=1BHPiZ0Hpkevk-auZM60LBAKFggpTuFFmeUtjU84qwBUMlExNkdFVDVSUlNHTjVCOFFQRkRTUzFaVC4u">
              Click here to register yourself!
            </a>
          </h3>
        </div>
      </div>
      <div className={styles["linking"]}>
        <p>
          For any queries related to learning,please feel free to reach out to
        </p>
        <a href="https://forms.office.com/pages/responsepage.aspx?id=1BHPiZ0Hpkevk-auZM60LBAKFggpTuFFmeUtjU84qwBUMlExNkdFVDVSUlNHTjVCOFFQRkRTUzFaVC4u">
          td_india@intelliswift.com
        </a>
        <div className={styles["regards"]}>
          <p>Best Regards,</p>
          <h4>Team Talent Developement</h4>
        </div>
      </div>
    </div>
  );
};
export default LearningLeagueMain;
