import React from "react";
import styles from "../file-selector/fileSelector.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch } from "react-redux";
import FileSelector from "../file-selector/FileSelector";

type ItalkImageSelector = {
  errorMsg: string;
  imgUrl?: any;
  handleImageSelect: (e: any, imgKey: string) => void;
  isEdit?: boolean;
  imgKey?: string;
  handleClose: (imgKey: string) => void;
  className?: string;
};

function ItalkImageSelector({
  errorMsg,
  imgUrl,
  handleImageSelect,
  isEdit,
  imgKey,
  handleClose,
  className = "",
}: ItalkImageSelector) {
  const dispatch = useDispatch();
  if (imgUrl && typeof imgUrl !== "string") {
    imgUrl = URL.createObjectURL(imgUrl);
  }

  // if (isEdit) {
  //   imgUrl = imgUrl ? imgUrl : userIcon;
  // }

  const hanldeOnChange = (e: any) => {
    handleImageSelect(e, imgKey!);
  };

  return (
    <>
      {imgUrl ? (
        <div className={`${styles["show-img-container"]} ${styles[className]}`}>
          <div className={styles["show-img-holder"]}>
            <img src={imgUrl} alt="profile_img"></img>
          </div>
          <div
            className={styles["remove-img"]}
            onClick={() => handleClose(imgKey!)}
          >
            <CancelIcon />
          </div>
        </div>
      ) : (
        <FileSelector
          handleOnChnage={hanldeOnChange}
          className={className}
          errorMsg={errorMsg}
        />
      )}
    </>
  );
}

export default ItalkImageSelector;
