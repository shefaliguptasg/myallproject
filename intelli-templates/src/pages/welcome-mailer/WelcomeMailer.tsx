import React from "react";
import styles from "./welcomeMailer.module.scss";
import Header from "./Header";
import Main from "./Main";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MAILER_USER_DATA } from "graphQL/welcome-mailer/welcomeMailerData";
import { useDispatch } from "react-redux";
import { getFontUrl } from "utils/generalUtils";
import { setMailerData } from "redux-store/actions/mailerActions";
import NoRecordPage from "../../components/no-record/NoRecord";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { Footer1 } from "components/common/footer/Footer";

const WelcomeMailer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  const userId = localStorage.getItem("mailerUserId");
  if (userId) {
    const { loading, error, data } = useQuery(GET_MAILER_USER_DATA, {
      variables: { userId },
    });

    if (loading) return <></>;
    if (data) {
      const mailerData = data.welcomeMailer.data.attributes;
      dispatch(setMailerData(mailerData));
    }
  }

  return (
    <>
      {userId ? (
        <div className={styles["main-header"]}>
          <Header />
          <Main />
          <Footer1 />
          {/* <DownloadTemplate /> */}
        </div>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under Welcome mailer employee list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
};

export default WelcomeMailer;
