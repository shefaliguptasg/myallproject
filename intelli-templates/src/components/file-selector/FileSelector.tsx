import React, { forwardRef } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import styles from "./fileSelector.module.scss";

const FileSelector = forwardRef(
  ({ handleOnChnage, errorMsg, className, ref }: any) => {
    return (
      <div className={`${styles["upload-img-holder"]} ${styles[className]}`}>
        <label className={styles["file-upolad-holder"]}>
          <div
            className={`${styles["img-holder"]} ${
              errorMsg ? styles["error"] : ""
            }`}
          >
            <div className={styles["img-wrap"]}>
              <span className="upload-icons">
                <CameraAltIcon />
              </span>
              <div className="upload-text">Add Image</div>
            </div>
          </div>
          <div style={{ display: "none" }} className="file-selector-div">
            <input
              id="upload"
              type="file"
              accept="image/*"
              ref={ref}
              onChange={(e) => handleOnChnage(e)}
            />
          </div>
        </label>
        {errorMsg ? (
          <div className={`${styles["img-error-label"]} mgt-5 mgb-15`}>
            {errorMsg}
          </div>
        ) : null}
      </div>
    );
  }
);

export default FileSelector;
