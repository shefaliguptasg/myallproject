import React from "react";
import styles from "../file-selector/fileSelector.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import FileSelector from "../file-selector/FileSelector";

type ILeapImageSelector = {
  errorMsg: String;
  imgUrl?: any;
  handleImageSelect: (e: any, imgKey: string | undefined) => void;
  isEdit?: boolean;
  imgKey?: string | undefined;
  handleClose: (imgKey: string | undefined) => void;
  className?: string;
};

function ILeapImageSelector({
  errorMsg,
  imgUrl,
  handleImageSelect,
  isEdit,
  imgKey,
  handleClose,
  className = "",
}: ILeapImageSelector) {
  const dispatch = useDispatch();
  if (imgUrl && typeof imgUrl !== "string") {
    imgUrl = URL.createObjectURL(imgUrl);
  }

  // if (isEdit) {
  //   imgUrl = imgUrl ? imgUrl : userIcon;
  // }

  const hanldeOnChange = (e: any) => {
    handleImageSelect(e, imgKey);
  };

  return (
    <>
      {imgUrl ? (
        // <div className={styles["show-img-container"]}>
        <div className={`${styles["show-img-container"]} ${styles[className]}`}>
          <div className={styles["show-img-holder"]}>
            <img src={imgUrl} alt="background_img"></img>
          </div>
          {/* {!isEdit && (
            <div
              className={styles["remove-img"]}
              onClick={() => handleClose(imgKey)}
            >
              <CancelIcon />
            </div>
          )} */}
          <div
            className={styles["remove-img"]}
            onClick={() => handleClose(imgKey)}
          >
            <CancelIcon />
          </div>
        </div>
      ) : (
        <FileSelector
          handleOnChnage={hanldeOnChange}
          errorMsg={errorMsg}
          className={className}
        />
      )}
    </>
  );
}

export default ILeapImageSelector;
