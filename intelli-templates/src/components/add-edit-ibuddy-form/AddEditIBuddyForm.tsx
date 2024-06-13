import React from "react";
import Slider from "../slider/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch } from "redux-store/actions/modelActions";
import { setIBuddySlider } from "redux-store/actions/strapiActions";
import UserIBuddyForm from "./UserIBuddyForm";
import { useSelector } from "react-redux";
import {
  addEditIBuddyUser,
  setIBuddyErrors,
} from "redux-store/actions/iBuddyAction";
import { showSnackBar } from "utils/snackBarUtils";
import { useMutation } from "@apollo/client";
import { CREATE_IBUDDY_USER } from "graphQL/ibuddy-data/createIBuddy";
import { UPDATE_IBUDDY_USER } from "graphQL/ibuddy-data/updateIBuddy";
import CommonFunctions from "utils/commonFunction";
import {
  CreateIntelliBuddyResponse,
  IBuddyErrObj,
  IBuddyFormData,
  UpdateIntelliBuddyResponse,
  addEditIBuddyUserType,
} from "./iAddEditIbuddyForm";
import { FetchResult } from "apollo-boost";
const AddEditIBuddyForm = () => {
  //redux data
  const iBuddyUserData: addEditIBuddyUserType = useSelector(
    (state: any) => state.iBuddyId.addEditIBuddyUser
  );
  const buddyBackgroundUrl: string = iBuddyUserData.buddyBackground;

  const joineeBackgroundUrl: string = iBuddyUserData.joineeBackground;

  const formData: IBuddyFormData = iBuddyUserData.iBuddyUserInfo;
  let isEdit: boolean = iBuddyUserData.isEdit;
  let errors: IBuddyErrObj = iBuddyUserData.errors || {};

  const [createIntelliIbuddy] = useMutation(CREATE_IBUDDY_USER);
  const [updateIntelliIbuddy] = useMutation(UPDATE_IBUDDY_USER);

  const validateFieldForm = () => {
    const errorObj: IBuddyErrObj = {} as IBuddyErrObj;
    let isValid = true,
      toastMsg = "";

    if (!buddyBackgroundUrl && !isEdit) {
      toastMsg = "Please Add Buddy Background Image";
      errorObj.buddyBackground = toastMsg;
      isValid = false;
    }

    if (!joineeBackgroundUrl && !isEdit) {
      toastMsg = "Please Add Joinee Background  Image";
      errorObj.joineeBackground = toastMsg;
      isValid = false;
    }

    if (!formData.joinee_first_name) {
      toastMsg = "First name is required";
      errorObj.joinee_first_name = toastMsg;
      isValid = false;
    }
    if (!formData.joinee_last_name) {
      toastMsg = "Last name is required";
      errorObj.joinee_last_name = toastMsg;
      isValid = false;
    }

    if (!formData.from_date) {
      toastMsg = "Date is required";
      errorObj.from_date = toastMsg;
      isValid = false;
    }
    if (!formData.to_date) {
      toastMsg = "Date is required";
      errorObj.to_date = toastMsg;
      isValid = false;
    }
    const newFromDate = new Date(formData.from_date);
    const newToDate = new Date(formData.to_date);
    if (newFromDate > newToDate) {
      toastMsg = "Please select valid Date";
      errorObj.to_date = toastMsg;
      errorObj.from_date = toastMsg;
      isValid = false;
    }

    if (!formData.buddy_text) {
      toastMsg = "iBuddy Text is required";
      errorObj.buddy_text = toastMsg;
      isValid = false;
    }

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    dispatch(setIBuddyErrors(errorObj));
    if (isValid) {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateIntelliIbuddy({
        variables: {
          userId: formData.id,
          joinee_first_name: formData.joinee_first_name,
          joinee_last_name: formData.joinee_last_name,
          from_date: formData.from_date,
          to_date: formData.to_date,
          buddy_text: formData.buddy_text,
          hr_approval: true,
          marketing_approval: false,
        },
      }).then((res: FetchResult<UpdateIntelliBuddyResponse>) => {
        if (res.data && res.data.updateIntelliBuddy) {
          if (
            typeof buddyBackgroundUrl !== "string" ||
            typeof joineeBackgroundUrl !== "string"
          ) {
            CommonFunctions.uploadImageFile(
              formData.id,
              buddyBackgroundUrl,
              "api::intelli-buddy.intelli-buddy",
              "buddy_background",
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

      createIntelliIbuddy({
        variables: {
          joinee_first_name: formData.joinee_first_name,
          joinee_last_name: formData.joinee_last_name,
          from_date: formData.from_date,
          to_date: formData.to_date,
          buddy_text: formData.buddy_text,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      }).then((res: FetchResult<CreateIntelliBuddyResponse>) => {
        if (res.data) {
          CommonFunctions.uploadImageFile(
            res.data.createIntelliBuddy.data.id,
            joineeBackgroundUrl,
            "api::intelli-buddy.intelli-buddy",
            "joinee_background",
            handleClose
          );
        }
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formObj = { ...formData };
    const { name, value } = e.target;
    formObj[name] = value;
    dispatch(addEditIBuddyUser(formObj));
  };

  const handleClose = () => {
    dispatch(setIBuddySlider(false));
    dispatch({ type: "CLEAR_IMAGES" });
  };

  return (
    <Slider
      headerProps={{
        heading: `${isEdit ? "Edit" : "Add"} iBuddy User`,
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
      <UserIBuddyForm
        errors={errors}
        formData={formData}
        handleChange={handleChange}
      />
    </Slider>
  );
};

export default AddEditIBuddyForm;
