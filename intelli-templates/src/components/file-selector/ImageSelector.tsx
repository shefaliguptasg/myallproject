import React from "react";
import styles from "./fileSelector.module.scss";
import CancelIcon from "@mui/icons-material/Cancel";
import FileSelector from "./FileSelector";
import userIcon from "../../assets/images/userIcon.png";
import { UploadImage } from "redux-store/actions/strapiActions";
import { useDispatch, useSelector } from "react-redux";

type ImageSelector = { errorMsg: string; isEdit: Boolean };

function ImageSelector({ errorMsg, isEdit }: ImageSelector) {
  const dispatch = useDispatch();
  let imgUrl = useSelector((state: any) => state.strapi.imgInfo);
  if (typeof imgUrl !== "string") {
    imgUrl = URL.createObjectURL(imgUrl);
  }
  // if (isEdit) {
  //   imgUrl = imgUrl ? imgUrl : userIcon;
  // }

  const handleChange = (e: any) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      dispatch(UploadImage(selectedFile));
    }
  };

  const handleCross = () => {
    dispatch(UploadImage(""));
  };

  return (
    <>
      {imgUrl ? (
        <div className={styles["show-img-container"]}>
          <div className={styles["show-img-holder"]}>
            <img src={imgUrl} alt="profile_img"></img>
          </div>
          <div className={styles["remove-img"]} onClick={handleCross}>
            <CancelIcon />
          </div>
        </div>
      ) : (
        <FileSelector handleOnChnage={handleChange} errorMsg={errorMsg} />
      )}
    </>
  );
}

export default ImageSelector;
