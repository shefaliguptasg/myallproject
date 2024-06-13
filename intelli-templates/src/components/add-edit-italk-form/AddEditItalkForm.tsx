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
import { setItalkSlider } from "redux-store/actions/strapiActions";
import {
  addEditItalkUser,
  setItalkErrors,
} from "redux-store/actions/iTalkAction";
import { CREATE_INTELLI_TALK } from "graphQL/italk-data/createItalk";
import { UPDATE_INTELLI_TALK } from "graphQL/italk-data/updateItalk";
import CommonFunctions from "utils/commonFunction";

const AddEditItalkForm = () => {
  const [isloading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const iTalkUserData = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser
  );
  const isItalkEdit = iTalkUserData.isItalkEdit;
  const iTalkFormData = iTalkUserData.iTalkUserInfo;
  const errors = iTalkUserData.errors || {};
  const profileImageUrl = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser.profileImage
  );

  const backgroundImageUrl = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser.backgroundImage
  );
  const [createIntelliTalk] = useMutation(CREATE_INTELLI_TALK);
  const [updateIntelliTalk] = useMutation(UPDATE_INTELLI_TALK);

  const handleDropDown = (e: any, timeKey: string) => {
    const formObj = { ...iTalkFormData };
    formObj[timeKey] = e.key;
    dispatch(addEditItalkUser(formObj));
  };
  const handleChange = (e: any) => {
    const formItalkObj = { ...iTalkFormData };
    const { name, value } = e.target;
    formItalkObj[name] = value;
    dispatch(addEditItalkUser(formItalkObj));
  };

  const validateFieldForm = () => {
    const errorObj: any = {};
    let isValid = true,
      toastMsg = "";

    if (!profileImageUrl && !isItalkEdit) {
      toastMsg = "Please Add Profile Image";
      errorObj.profileImage = toastMsg;
      isValid = false;
    }

    if (!backgroundImageUrl && !isItalkEdit) {
      toastMsg = "Please Add Background  Image";
      errorObj.backgroundImage = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.title) {
      toastMsg = "Title is required";
      errorObj.title = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.first_name) {
      toastMsg = "First Name is required";
      errorObj.first_name = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.last_name) {
      toastMsg = "Last Name is required";
      errorObj.last_name = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.designation) {
      toastMsg = "Designation is required";
      errorObj.designation = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.info) {
      toastMsg = "Info is required";
      errorObj.info = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.join_us) {
      toastMsg = "Join us is required";
      errorObj.join_us = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.topic_name) {
      toastMsg = "Topic Name is required";
      errorObj.topic_name = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.info) {
      toastMsg = "info is required";
      errorObj.info = toastMsg;
      isValid = false;
    }
    if (!iTalkFormData.join_us) {
      toastMsg = "Join Us is required";
      errorObj.join_us = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.attendee_text) {
      toastMsg = "Attendee is required";
      errorObj.attendee_text = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.from) {
      toastMsg = "from is required";
      errorObj.from = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.to) {
      toastMsg = "to is required";
      errorObj.to = toastMsg;
      isValid = false;
    }

    if (!iTalkFormData.date) {
      toastMsg = "date is required";
      errorObj.date = toastMsg;
      isValid = false;
    }

    const convFrom = timeConv(iTalkFormData.from);
    const convTo = timeConv(iTalkFormData.to);
    if (!iTalkFormData.from) {
    }
    if (parseInt(convTo) > parseInt(convFrom)) {
      toastMsg = "";
    } else {
      toastMsg = "Please Select Valid Time Range";
      errorObj.to = toastMsg;
      errorObj.from = toastMsg;
      isValid = false;
    }

    let errTopics: any = [];
    iTalkFormData.topics.map((ele: any) => {
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
    dispatch(setItalkErrors(errorObj));
    if (isValid) {
      handleOnSubmit();
      dispatch({ type: "CLEAR_IMAGES" });
    }
  };

  function timeConv(time: string): string {
    const [hours, ampm] = time.split(" ");
    const formattedHours = hours === "12" && ampm === "AM" ? "00" : hours;
    const convertedHours =
      ampm === "PM" && hours !== "12"
        ? parseInt(formattedHours) + 12
        : formattedHours;
    const formattedTime = `${String(convertedHours).padStart(2, "0")}`;
    return formattedTime;
  }

  const handleOnSubmit = () => {
    setLoading(true);
    if (isItalkEdit) {
      updateIntelliTalk({
        variables: {
          userId: iTalkFormData.id,
          title: iTalkFormData.title,
          first_name: iTalkFormData.first_name,
          last_name: iTalkFormData.last_name,
          date: iTalkFormData.date,
          designation: iTalkFormData.designation,
          info: iTalkFormData.info,
          topic_name: iTalkFormData.topic_name,
          attendee_text: iTalkFormData.attendee_text,
          join_us: iTalkFormData.join_us,
          topics: iTalkFormData.topics,
          from: iTalkFormData.from,
          to: iTalkFormData.to,
        },
      }).then((res) => {
        if (res.data) {
          if (
            typeof profileImageUrl !== "string" ||
            typeof backgroundImageUrl !== "string"
          ) {
            CommonFunctions.uploadImageFile(
              iTalkFormData.id,
              profileImageUrl,
              "api::intelli-talk.intelli-talk",
              "profile",
              handleClose
            );
          } else {
            showSnackBar("User Updated Successfully", "success");
            setTimeout(() => {
              handleClose();
            }, 500);
          }
        }
      });
    } else {
      const timeStamp = new Date().toISOString();
      createIntelliTalk({
        variables: {
          title: iTalkFormData.title,
          first_name: iTalkFormData.first_name,
          last_name: iTalkFormData.last_name,
          date: iTalkFormData.date,
          designation: iTalkFormData.designation,
          info: iTalkFormData.info,
          topic_name: iTalkFormData.topic_name,
          attendee_text: iTalkFormData.attendee_text,
          join_us: iTalkFormData.join_us,
          topics: iTalkFormData.topics,
          from: iTalkFormData.from,
          to: iTalkFormData.to,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: any) => {
          if (res.data && res.data.createIntelliTalk) {
            CommonFunctions.uploadImageFile(
              res.data.createIntelliTalk.data.id,
              backgroundImageUrl,
              "api::intelli-talk.intelli-talk",
              "background",
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
    dispatch(setItalkSlider(false));
    dispatch({ type: "CLEAR_IMAGES" });
    setLoading(false);
  };

  return (
    <Slider
      headerProps={{
        heading: `${isItalkEdit ? "Edit" : "Add"} Italk User`,
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
        iTalkFormData={iTalkFormData}
        handleChange={handleChange}
        handleDropDown={handleDropDown}
      />
    </Slider>
  );
};

export default AddEditItalkForm;
