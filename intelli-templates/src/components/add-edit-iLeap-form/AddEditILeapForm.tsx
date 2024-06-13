import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { showSnackBar } from "utils/snackBarUtils";
import EmployeeForm from "./UserForm";
import { useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Slider from "../slider/Slider";
import { setILeapSlider } from "redux-store/actions/strapiActions";
import {
  addEditILeapUser,
  setILeapErrors,
} from "redux-store/actions/iLeapAction";
import { CREATE_INTELLI_LEAP } from "graphQL/ileap-data/createILeap";
import { UPDATE_INTELLI_LEAP } from "graphQL/ileap-data/updateILeap";
import CommonFunctions from "utils/commonFunction";

const AddEditIleapForm = () => {
  const [isloading, setLoading] = useState(false);

  const dispatch = useDispatch();

  let iLeapUserData = useSelector(
    (state: any) => state.iLeapId.addEditILeapUser
  );

  let isIleapEdit = iLeapUserData.isIleapEdit;

  let iLeapFormData = iLeapUserData.iLeapUserInfo;
  let errors = iLeapUserData.errors || {};

  // for background image

  const backgroundImageUrl = useSelector(
    (state: any) => state.iLeapId.addEditILeapUser.backgroundImage
  );

  const [createIntelliLeap] = useMutation(CREATE_INTELLI_LEAP);
  const [updateIntelliLeap] = useMutation(UPDATE_INTELLI_LEAP); // GraphQL Query required, Demo Query for now

  const handleDropDown = (e: any, timeKey: string) => {
    const formObj = { ...iLeapFormData };
    formObj[timeKey] = e.key;
    dispatch(addEditILeapUser(formObj));
  };
  const handleChange = (e: any) => {
    const formIleapObj = { ...iLeapFormData };

    const { name, value } = e.target;
    formIleapObj[name] = value;

    dispatch(addEditILeapUser(formIleapObj));
  };

  const validateFieldForm = () => {
    const errorObj: any = {};
    let isValid = true,
      toastMsg = "";

    if (!backgroundImageUrl && !isIleapEdit) {
      toastMsg = "Please Add Background  Image";
      errorObj.backgroundImage = toastMsg;
      isValid = false;
    }

    if (!iLeapFormData.header_text) {
      toastMsg = "Header Text Is Required.";
      errorObj.header_text = toastMsg;
      isValid = false;
    }

    if (!iLeapFormData.first_paragraph) {
      toastMsg = "First Paragraph is required";
      errorObj.first_paragraph = toastMsg;
      isValid = false;
    }

    if (!iLeapFormData.topics) {
      toastMsg = "Topic Name is required";
      errorObj.topic_name = toastMsg;
      isValid = false;
    }
    if (!iLeapFormData.second_paragraph) {
      toastMsg = "Second Paragraph is required";
      errorObj.second_paragraph = toastMsg;
      isValid = false;
    }

    let errTopics: any = [];
    iLeapFormData.topics.map((ele: any) => {
      if (!ele) {
        toastMsg = "Topics cannot be empty";
      } else {
        toastMsg = "";
      }
      errTopics.push(toastMsg);
    });

    errorObj.topics = [...errTopics];

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    dispatch(setILeapErrors(errorObj));
    if (isValid) {
      handleOnSubmit();
      dispatch({ type: "CLEAR_IMAGES" });
    }
  };

  const handleOnSubmit = () => {
    setLoading(true);
    if (isIleapEdit) {
      updateIntelliLeap({
        variables: {
          userId: iLeapFormData.id,
          header_text: iLeapFormData.header_text,
          first_paragraph: iLeapFormData.first_paragraph,
          second_paragraph: iLeapFormData.second_paragraph,
          topics: iLeapFormData.topics,
        },
      }).then(async (res) => {
        if (res.data) {
          if (typeof backgroundImageUrl !== "string") {
            await CommonFunctions.uploadImageFile(
              iLeapFormData.id,
              backgroundImageUrl,
              "api::intelli-i-leap.intelli-i-leap",
              "background_image",
              handleClose
            );
          }
        }
      });
    } else {
      const timeStamp = new Date().toISOString();
      createIntelliLeap({
        variables: {
          header_text: iLeapFormData.header_text,
          first_paragraph: iLeapFormData.first_paragraph,
          second_paragraph: iLeapFormData.second_paragraph,
          topics: iLeapFormData.topics,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: any) => {
          if (res.data && res.data.createIntelliILeap) {
            await CommonFunctions.uploadImageFile(
              res.data.createIntelliILeap.data.id,
              backgroundImageUrl,
              "api::intelli-i-leap.intelli-i-leap",
              "background_image",
              handleClose
            );
          }
        })
        .catch((error) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };

  const handleClose = () => {
    dispatch(setILeapSlider(false));
    dispatch({ type: "CLEAR_IMAGES" });
    setLoading(false);
  };

  return (
    <Slider
      headerProps={{
        heading: `${isIleapEdit ? "Edit" : "Add"} Ileap User`,
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
            onClick: () => (isloading ? null : validateFieldForm()),
            size: "lg",
            className: "footer-btn-holder",
            round: "pill",
            isLoader: isloading ? true : false,
          },
        ],
      }}
    >
      <EmployeeForm
        errors={errors}
        iLeapFormData={iLeapFormData}
        handleChange={handleChange}
        handleDropDown={handleDropDown}
      />
    </Slider>
  );
};

export default AddEditIleapForm;
