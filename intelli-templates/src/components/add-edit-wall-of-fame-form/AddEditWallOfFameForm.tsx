import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "../slider/Slider";

import { useDispatch, useSelector } from "react-redux";
import {
  addEditWallOfFameUser,
  setWallOfFameError,
} from "redux-store/actions/wallOfFameAction";
import AddIcon from "@mui/icons-material/Add";
import { showSnackBar } from "utils/snackBarUtils";
import { useMutation } from "@apollo/client";
import { setWallOfFameSlider } from "redux-store/actions/strapiActions";
import FameEntry from "./UserWallOfFameForm";
import { CREATE_WALL_OF_FAME_USER } from "graphQL/wall-of-fame-data/createWallOfFame";
import { UPDATE_WALL_OF_FAME_USER } from "graphQL/wall-of-fame-data/updateWallOfFame";
import { InputWithMovingLabel } from "intelli-ui-components-library";
import styles from "./userWallOfFame.module.scss";

const AddEditWallOfFameForm = () => {
  const dispatch = useDispatch();
  const fameData = useSelector(
    (state: any) => state.wallOfFame.wallOfFameUserInfo
  );

  const errorDataObj = useSelector((state: any) => state.wallOfFame.errors);

  const isEdit = fameData.isEdit;
  const [createWallOfFameUser] = useMutation(CREATE_WALL_OF_FAME_USER);
  const [updateWallOfFameUser] = useMutation(UPDATE_WALL_OF_FAME_USER);

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const tempUserData = [...fameData.userData];
    tempUserData[index] = { ...tempUserData[index], [name]: value };
    const tempFameData = { ...fameData, userData: tempUserData };
    dispatch(addEditWallOfFameUser(tempFameData));
  };

  const handleAddUser = () => {
    const tempAddUserData = [...fameData.userData];
    tempAddUserData.push({
      first_name: "",
      last_name: "",
      certificate_name: "",
      image: "",
    });
    const tempFameData = {
      ...fameData,
      userData: tempAddUserData,
    };
    dispatch(addEditWallOfFameUser(tempFameData));
  };

  const deleteUser = (index: number) => {
    const tempUserData = [...fameData.userData];
    tempUserData.splice(index, 1);
    const tempFameData = { ...fameData, userData: tempUserData };
    dispatch(addEditWallOfFameUser(tempFameData));
  };

  const validateFieldForm = () => {
    let isValid = true;
    let toastMsg = "";
    const errorDataArr: any = [];
    const errorDataCopy = { ...errorDataObj };

    if (!fameData.quarter_year) {
      toastMsg = "Quarter Year is required";
      errorDataCopy["quarter_year"] = toastMsg;
      isValid = false;
    }

    fameData.userData.forEach((err: any, index: number) => {
      const errorObj: any = {};
      if (!err.image) {
        toastMsg = "Please Add Profile Image";
        errorObj.image = toastMsg;
        isValid = false;
      }
      if (!err.first_name) {
        toastMsg = "First Name is required";
        errorObj.first_name = toastMsg;
        isValid = false;
      }
      if (!err.last_name) {
        toastMsg = "Last Name is required";
        errorObj.last_name = toastMsg;
        isValid = false;
      }

      if (!err.certificate_name) {
        toastMsg = "Certificate Name is required";
        errorObj.certificate_name = toastMsg;
        isValid = false;
      }
      errorDataArr.push(errorObj);
    });

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }

    errorDataCopy.userData = errorDataArr;

    dispatch(setWallOfFameError(errorDataCopy));
    if (isValid) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateWallOfFameUser({
        variables: {
          userId: fameData.id,
          user_data: fameData.userData,
          quarter_year: fameData.quarter_year,
        },
      }).then(async (res) => {
        if (res.data) {
          showSnackBar("User Updated Successfully", "success");
          setTimeout(() => {
            handleClose();
          }, 500);
        }
      });
    } else {
      const timeStamp = new Date().toISOString();
      createWallOfFameUser({
        variables: {
          user_data: fameData.userData,
          quarter_year: fameData.quarter_year,
          publishedAt: timeStamp,
        },
      })
        .then(async (res) => {
          if (res.data && res.data.createIntelliWof) {
            showSnackBar("User added successfully", "success");
            setTimeout(() => {
              handleClose();
            }, 500);
          }
        })
        .catch((err: any) => {
          showSnackBar("Something went wron!", "error");
        });
    }
  };

  const handleClose = () => {
    dispatch(setWallOfFameSlider(false));
  };

  const handleYearChange = (e: any) => {
    const formItalkObj = { ...fameData };
    const { name, value } = e.target;
    formItalkObj[name] = value;
    dispatch(addEditWallOfFameUser(formItalkObj));
  };

  return (
    <Slider
      headerProps={{
        heading: `Wall of Fame Entries`,
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
      <div className={styles["input-holder"]}>
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "quarter_year",
            value: fameData.quarter_year,
            label: "Quarter Year",
            onChange: handleYearChange,
          }}
          errorMsg={errorDataObj?.quarter_year || ""}
        ></InputWithMovingLabel>
      </div>
      <div className={styles["divider"]}></div>
      {fameData.userData.map((user: any, index: number) => (
        <FameEntry
          key={index}
          user={user}
          handleChange={handleChange}
          index={index}
          deleteUser={() => deleteUser(index)}
          showDelete={index >= 2}
        />
      ))}
      {fameData.userData.length < 5 && (
        <div
          className={`${styles["custom-add-icon"]} mgtb-15`}
          onClick={handleAddUser}
        >
          <span className={styles["custom-btn-wrap"]}>
            <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
            <span>Add Another Entry</span>
          </span>
        </div>
      )}
    </Slider>
  );
};
export default AddEditWallOfFameForm;
