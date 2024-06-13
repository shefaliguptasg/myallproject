import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "../slider/Slider";
import { InputWithMovingLabel, TextArea } from "intelli-ui-components-library";
import styles from "./userWallOfFame.module.scss";
import ItalkImageSelector from "../add-edit-italk-form/ItalkImageSelector";
import { useDispatch, useSelector } from "react-redux";
import { addEditWallOfFameUser } from "redux-store/actions/wallOfFameAction";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CommonFunctions from "utils/commonFunction";

const FameEntry = ({
  user,
  handleChange,
  deleteUser,
  index,
  showDelete,
}: {
  user: any;
  handleChange: any;
  index: number;
  showDelete: boolean;
  deleteUser: () => void;
}) => {
  const dispatch = useDispatch();
  const fameData = useSelector(
    (state: any) => state.wallOfFame.wallOfFameUserInfo
  );

  const errorDataObj = useSelector(
    (state: any) => state.wallOfFame.errors.userData
  );

  const handleImageSelect = async (e: any, imgKey: string | undefined) => {
    const selectedFile = e.target.files && e.target.files[0];
    const newData = new FormData();
    newData.append("files", selectedFile!, `templet-${Date.now()}`);
    const { data: filepath } = await axios.post(
      `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
      newData
    );
    if (filepath && filepath[0].url) {
      const tempUserData = [...fameData.userData];
      tempUserData[index] = { ...tempUserData[index], image: filepath[0].url };
      const tempFameData = { ...fameData, userData: tempUserData };
      dispatch(addEditWallOfFameUser(tempFameData));
    }
  };

  // const handleImageSelect = ()=>{CommonFunctions.selectImage()};

  const handleClose = () => {
    const tempUserData = [...fameData.userData];
    tempUserData[index] = { ...tempUserData[index], image: "" };
    const tempLearningData = { ...fameData, userData: tempUserData };
    dispatch(addEditWallOfFameUser(tempLearningData));
  };

  return (
    <div className={styles["fame-entry-container"]}>
      <div className={styles["user-img-fame-block"]}>
        <ItalkImageSelector
          errorMsg={errorDataObj?.[index]?.image || ""}
          handleImageSelect={handleImageSelect}
          isEdit={false}
          imgKey="selectImage"
          imgUrl={
            user.image
              ? `${process.env.REACT_APP_STRAPI_BASE_URL}${user.image}`
              : ""
          }
          handleClose={handleClose}
          className={"user-image-holder"}
        />

        <div className={styles["input-fame-holder"]}>
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "first_name",
              value: user.first_name,
              label: "First Name",
              onChange: (e) => handleChange(e, index),
            }}
            errorMsg={errorDataObj?.[index]?.first_name || ""}
          ></InputWithMovingLabel>
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "last_name",
              value: user.last_name,
              label: "Last Name",
              onChange: (e) => handleChange(e, index),
            }}
            errorMsg={errorDataObj?.[index]?.last_name || ""}
          ></InputWithMovingLabel>
        </div>
      </div>

      <div className={styles["remove-icon-userdata"]}>
        <div className={styles["input-fame-holder"]}>
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "certificate_name",
              value: user.certificate_name,
              label: "Certificate Name",
              onChange: (e) => handleChange(e, index),
            }}
            errorMsg={errorDataObj?.[index]?.certificate_name || ""}
          ></InputWithMovingLabel>
        </div>
        {showDelete && (
          <DeleteIcon className={styles["delete-icon"]} onClick={deleteUser} />
        )}
      </div>
    </div>
  );
};
export default FameEntry;
