import React from "react";
import styles from "./horizantalbar.module.scss";

function HorizontalBar({ className = "" }) {
  return (
    <div className={`${styles["color-box"]} ${className}`}>
      <div id={styles["red-box"]}></div>
      <div id={styles["yellow-box"]}></div>
      <div id={styles["pink-box"]}></div>
      <div id={styles["blue-box"]}></div>
      <div id={styles["green-box"]}></div>
    </div>
  );
}

export default HorizontalBar;
