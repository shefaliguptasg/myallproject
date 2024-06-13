import React from "react";
import styles from "./appreciation.module.scss";
import { useSelector } from "react-redux";
import Header from "components/common/header/Header";

function AppreciationHeader() {
  const tndData = useSelector((state: any) => state.tndInfo.tndData);

  return (
    <Header
      classname={{
        headerBackgroundClass: styles["header-background"],
        verticalBarCss: styles["header-vertical-bar"],
      }}
    >
      <div className={styles["header-text-icon-container"]}>
        <div className={styles["header-yellow-icon"]}>&#9701;</div>
        <div className={styles["header-text"]}>
          <p className={styles["text-quote"]}>{tndData.title}</p>
          <p className={styles["text-author-name"]}>
            <span>&#8211;</span> Bobby Unser
          </p>
        </div>
        <div className={styles["header-red-icon"]}>&#9699;</div>
      </div>
    </Header>
  );
}

export default AppreciationHeader;
