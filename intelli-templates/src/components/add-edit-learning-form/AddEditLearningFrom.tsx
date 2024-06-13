import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import Slider from "../slider/Slider";
import { setLearningSlider } from "redux-store/actions/strapiActions";
import LearningForm from "./LearningForm";
import { useDispatch, useSelector } from "react-redux";
import { showSnackBar } from "utils/snackBarUtils";
import { setValidationErrors } from "redux-store/actions/learningAction";
import { useMutation } from "@apollo/client";
import { CREAT_LEARNING_USER } from "graphQL/learning-data/createlearning";
import { UPDATE_LEARNING_USER } from "graphQL/learning-data/updateLearning";

const AddEditLearningForm = () => {
  const dispatch = useDispatch();

  const learningData = useSelector(
    (state: any) => state.learningLeague.learningUserInfo
  );

  const isEdit = learningData.isEdit;

  const errorDataObj = useSelector((state: any) => state.learningLeague.errors);

  const [createLearningLeague] = useMutation(CREAT_LEARNING_USER);
  const [updateLearningLeague] = useMutation(UPDATE_LEARNING_USER);

  const handleClose = () => {
    dispatch(setLearningSlider(false));
  };

  const validateFieldForm = () => {
    let isValid = true;
    let toastMsg = "";
    const errorDataArr: any = [];

    learningData.sectionData.forEach((err: any, index: number) => {
      let errorObj: any = "";
      if (!err) {
        toastMsg = "learning data cannot be empty";
        errorObj = toastMsg;
        isValid = false;
      }
      errorDataArr.push(errorObj);
    });
    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    const errorDataCopy = { ...errorDataObj };
    errorDataCopy.sectionData = errorDataArr;

    dispatch(setValidationErrors(errorDataCopy));
    if (isValid) {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateLearningLeague({
        variables: {
          userId: learningData.id,
          user_data: learningData.userData,
          section_data: learningData.sectionData,
        },
      }).then((res) => {
        if (res.data) {
          showSnackBar("User Updated Successfully", "success");
          setTimeout(() => {
            handleClose();
          }, 500);
        }
      });
    } else {
      const timeStamp = new Date().toISOString();

      createLearningLeague({
        variables: {
          user_data: learningData.userData,
          section_data: learningData.sectionData,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: any) => {
          if (res.data && res.data.createLearningLeague) {
            showSnackBar(" User created successfully!", "success");
            handleClose();
          } else {
            showSnackBar(" Failed to create user", "error");
          }
        })
        .catch((error) => {
          showSnackBar(" Something went wrong", "error");
        });
    }
  };

  const header = true;
  return (
    <Slider
      headerProps={{
        heading: `${header ? "Edit" : "Add"} Learning User`,
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
      <LearningForm />
    </Slider>
  );
};

export default AddEditLearningForm;
