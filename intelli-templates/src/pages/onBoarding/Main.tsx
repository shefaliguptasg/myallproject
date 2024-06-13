import React from "react";
import styles from "./on-boarding.module.scss";
import { useSelector } from "react-redux";

const Main: React.FC<any> = (props) => {
  //this is data from redux for perticular user featch from use data api
  //use this selector in component to get data of users
  const obData = useSelector((state: any) => state.obId.obData);

  if (!obData) return <div>loading......</div>;
  return (
    <>
      <div className={styles["main-content"]}>
        <p>
          <b>Dear Intellians,</b>
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: obData.info,
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: obData.past_detail,
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: obData.education,
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: obData.life_style,
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: obData.wish_text,
          }}
        ></p>
        {obData.email && (
          <div className="pdt-15">
            <p className={styles["emp-contact-content"]}>
              You can reach {obData.first_name} at: <b>{obData.email}</b>{" "}
            </p>
          </div>
        )}
        {obData.mobile_no && (
          <div>
            <p className={styles["emp-contact-content"]}>
              Contact Number: <b>{obData.mobile_no}</b>
            </p>
          </div>
        )}
        {obData.manager && (
          <div>
            <p
              className={styles["emp-contact-content"]}
              style={{ textTransform: "capitalize" }}
            >
              Reporting Manager: <b>{obData.manager}</b>
            </p>
          </div>
        )}
        {obData.location && obData.location.length ? (
          <div>
            <p
              className={styles["emp-contact-content"]}
              style={{ textTransform: "capitalize" }}
            >
              Work Location: <b>{obData.location}</b>
            </p>
          </div>
        ) : null}
        <p className={styles["salutation"]}>
          <b> Regards,</b>
          <br />
          <b> Human Resource</b>
        </p>
      </div>
    </>
  );
};

export default Main;
