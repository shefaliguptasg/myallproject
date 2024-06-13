import React from "react";
import styles from "./wallOfFameTemplate.module.scss";
import { useSelector } from "react-redux";

function Main() {
  const fameData = useSelector(
    (state: any) => state.wallOfFame.wallOfFameUserInfo
  );

  return (
    <div className={styles["main-container"]}>
      <div className={styles["wall-container"]}>
        {fameData.userData.map((user: any, index: number) => (
          <div key={index} className={styles["container"]}>
            <img
              className={styles["profile-img"]}
              src={`http://template.intelliswift.com:1337${user.image}`}
              alt={`${user.first_name} ${user.last_name}'s profile`}
            />
            <div className={styles["profile-details"]}>
              <strong>{`${user.first_name} ${user.last_name}`}</strong>
              <p>{user.certificate_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Main;
