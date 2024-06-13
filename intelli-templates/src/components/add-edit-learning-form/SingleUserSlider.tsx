import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "../slider/Slider";
import { InputWithMovingLabel, TextArea } from "intelli-ui-components-library";
import styles from "./addEditLearning.module.scss";
import ItalkImageSelector from "../add-edit-italk-form/ItalkImageSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditLearningUser,
  setValidationErrors,
} from "redux-store/actions/learningAction";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import { showSnackBar } from "utils/snackBarUtils";
import { useMutation } from "@apollo/client";
import { CREAT_LEARNING_USER } from "graphQL/learning-data/createlearning";
import axios from "axios";
import { ConstructionOutlined } from "@mui/icons-material";
import { CLEAR_LEARNING_USER_INFO } from "redux-store/actions/actionConstant";

const SingleUserSlider = ({
  users,
  handleSlider,
}: {
  users: any[];
  handleSlider: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const learningData = useSelector(
    (state: any) => state.learningLeague.learningUserInfo
  );

  const errorDataObj = useSelector((state: any) => state.learningLeague.errors);

  const [createLearningLeague] = useMutation(CREAT_LEARNING_USER);

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;

    const tempUserData = [...learningData.userData];
    tempUserData[index] = { ...tempUserData[index], [name]: value };
    const tempLearningData = { ...learningData, userData: tempUserData };
    dispatch(addEditLearningUser(tempLearningData));
  };

  const handleAddUser = () => {
    const tempAddUserData = [...learningData.userData];
    tempAddUserData.push({
      emp_name: "",
      courses: "",
      description: "",
      image: "",
    });
    const tempLearningData = {
      ...learningData,
      userData: [...tempAddUserData],
    };
    dispatch(addEditLearningUser(tempLearningData));
  };

  const deleteUser = (index: number) => {
    const tempUserData = [...learningData.userData];
    tempUserData.splice(index, 1);
    const tempLearningData = { ...learningData, userData: tempUserData };
    dispatch(addEditLearningUser(tempLearningData));
  };

  const validateFieldForm = () => {
    let isValid = true;
    let toastMsg = "";
    const errorDataArr: any = [];

    learningData.userData.forEach((err: any, index: number) => {
      const errorObj: any = {};
      if (!err.image) {
        toastMsg = "Please Add Profile Image";
        errorObj.image = toastMsg;
        isValid = false;
      }

      if (!err.emp_name) {
        toastMsg = "First Name is required";
        errorObj.emp_name = toastMsg;
        isValid = false;
      }
      if (!err.courses) {
        toastMsg = "No. of courses is required";
        errorObj.courses = toastMsg;
        isValid = false;
      }

      if (!err.description) {
        toastMsg = "description is required";
        errorObj.description = toastMsg;
        isValid = false;
      }

      errorDataArr.push(errorObj);
    });

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    const errorDataCopy = { ...errorDataObj };
    errorDataCopy.userData = errorDataArr;

    dispatch(setValidationErrors(errorDataCopy));
    if (isValid) {
      handleClose();
    }
  };

  const handleClose = () => {
    handleSlider(false);
  };

  return (
    <Slider
      headerProps={{
        heading: `Learning Users`,
        leftIcons: {
          icon: <ChevronLeftIcon />,
          className: "left-icon-holder",
          onClick: () => handleClose(),
        },
        rightIcons: {
          icon: <CloseIcon />,
          className: "left-icon-holder",
          onClick: () => handleClose(),
        },
        className: "header-holder",
      }}
      footerProps={{
        btnProps: [
          {
            children: "Save",
            onClick: validateFieldForm,
            size: "lg",
            className: "footer-btn-holder",
            round: "pill",
          },
        ],
      }}
    >
      {learningData.userData.map((user: any, index: number) => (
        <Singleuser
          key={index}
          user={user}
          handleChange={handleChange}
          index={index}
          deleteUser={() => deleteUser(index)}
          showDelete={index >= 2}
        />
      ))}
      {learningData.userData.length < 5 && (
        <div
          className={`${styles["custom-add-icon"]} mgtb-15`}
          onClick={handleAddUser}
        >
          <span className={styles["custom-btn-wrap"]}>
            <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
            <span>Add Another User</span>
          </span>
        </div>
      )}
    </Slider>
  );
};

export default SingleUserSlider;

const Singleuser = ({
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
  const learningData = useSelector(
    (state: any) => state.learningLeague.learningUserInfo
  );
  const errorDataObj = useSelector(
    (state: any) => state.learningLeague.errors.userData
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
      const tempUserData = [...learningData.userData];
      tempUserData[index] = { ...tempUserData[index], image: filepath[0].url };
      const tempLearningData = { ...learningData, userData: tempUserData };
      dispatch(addEditLearningUser(tempLearningData));
    }
  };

  const handleClose = () => {
    const tempUserData = [...learningData.userData];
    tempUserData[index] = { ...tempUserData[index], image: "" };
    const tempLearningData = { ...learningData, userData: tempUserData };
    dispatch(addEditLearningUser(tempLearningData));
  };

  return (
    <div className={styles["single-user-container"]}>
      <div className={styles["user-img-block"]}>
        <ItalkImageSelector
          errorMsg={errorDataObj[index]?.image || ""}
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

        <div className={styles["input-holder"]}>
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "emp_name",
              value: user.emp_name,
              label: "Emp Name",
              onChange: (e) => handleChange(e, index),
            }}
            errorMsg={errorDataObj[index]?.emp_name || ""}
          ></InputWithMovingLabel>
          <InputWithMovingLabel
            inputProps={{
              type: "number",
              name: "courses",
              value: user.courses,
              label: "No. of Courses",
              onChange: (e) => handleChange(e, index),
            }}
            errorMsg={errorDataObj[index]?.courses || ""}
          ></InputWithMovingLabel>
        </div>
      </div>
      <div className={styles["remove-icon-userdata"]}>
        <TextArea
          className={styles["icon-wrap"]}
          inputProps={{
            type: "text",
            name: `description`,
            value: user.description,
            label: `Description`,
            onChange: (e) => handleChange(e, index),
          }}
          errorMsg={errorDataObj[index]?.description || ""}
          multiLine={true}
          rows={1}
        />
        {showDelete && (
          <div className={styles["delete-icon"]} onClick={deleteUser}>
            <DeleteIcon />
          </div>
        )}
      </div>
    </div>
  );
};
