import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./snackBar.module.scss";
const BoldNote = () => {
  const msg = `To appear text in Bold please wrap content inside <b></b> eg. <b>Hello</b> `;
  return (
    <div className={styles["bold-note-holder"]}>
      <div className={styles["bold-container"]}>
        <InfoIcon className="mgr-5" />
        <div className={styles["text-holder"]}>{msg}</div>
      </div>
    </div>
  );
};

export default BoldNote;
