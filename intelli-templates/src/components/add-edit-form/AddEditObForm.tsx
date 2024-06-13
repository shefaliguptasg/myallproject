import Slider from "../slider/Slider";
import React, { useState } from "react";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { showSnackBar } from "utils/snackBarUtils";
import EmployeeForm from "./UserForm";
import { CREATE_ONBOARDING_USER } from "graphQL/onbording-data/createOnboarding";
import { FetchResult, useMutation } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { addEditObUser, setObErrors } from "redux-store/actions/obAction";
import { setSlider } from "redux-store/actions/strapiActions";
import { UPDATE_ONBOARDING_USER } from "graphQL/onbording-data/updateOnboardingUser";
import axios from "axios";
import {
  ObFormData,
  CreateObFormResponse,
  ObFormErrObj,
  UpdateObFormResponse,
  ObFormUserData,
} from "./iAddEditObForm";

const AddEditObForm: React.FC = () => {
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const file = useSelector((state: any) => state.strapi.imgInfo);
  const obUserData: ObFormUserData = useSelector(
    (state: any) => state.obId.addEditObUser
  );
  const isEdit: boolean = obUserData.isEdit;
  const formData: ObFormData = obUserData.obUserInfo;
  const errors: ObFormErrObj = obUserData.errors || {};
  const [createOnboardingUser] = useMutation(CREATE_ONBOARDING_USER);
  const [updateOnboardingUser] = useMutation(UPDATE_ONBOARDING_USER);
  console.log("formData", formData);
  const handleDropDown = (e: { key: string }) => {
    const formObj = { ...formData };
    formObj["location"] = e.key;
    dispatch(addEditObUser(formObj));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formObj = { ...formData };
    const { name, value } = e.target;
    formObj[name] = value;
    dispatch(addEditObUser(formObj));
  };

  const validateFieldForm = () => {
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const mobileRegEx = /^[0-9]{10}$/;
    // const errorObj: any = {};
    const errorObj: ObFormErrObj = {} as ObFormErrObj;
    let isValid = true,
      toastMsg = "";

    if (!file && !isEdit) {
      toastMsg = "Please Add Profile Image";
      errorObj.image = toastMsg;
      isValid = false;
    }

    if (!formData.title) {
      toastMsg = "Title is required";
      errorObj.title = toastMsg;
      isValid = false;
    }

    if (!formData.first_name) {
      toastMsg = "First Name is required";
      errorObj.first_name = toastMsg;
      isValid = false;
    }

    if (!formData.last_name) {
      toastMsg = "Last Name is required";
      errorObj.last_name = toastMsg;
      isValid = false;
    }
    if (!formData.email) {
      toastMsg = "Email is required";
      errorObj.email = toastMsg;
      isValid = false;
    } else if (!emailRegEx.test(formData.email)) {
      toastMsg = "Invalid email address";
      errorObj.email = toastMsg;
      isValid = false;
    }
    if (!formData.mobile_no || !mobileRegEx.test(formData.mobile_no)) {
      toastMsg = "Invalid mobile number";
      errorObj.mobile_no = toastMsg;
      isValid = false;
    }

    if (!formData.designation) {
      toastMsg = "Designation is required";
      errorObj.designation = toastMsg;
      isValid = false;
    }

    if (!formData.manager) {
      toastMsg = "Manager is required";
      errorObj.manager = toastMsg;
      isValid = false;
    }
    if (!formData.location) {
      toastMsg = "location is required";
      errorObj.location = toastMsg;
      isValid = false;
    }

    if (!formData.info) {
      toastMsg = "info is required";
      errorObj.info = toastMsg;
      isValid = false;
    }
    if (!formData.education) {
      toastMsg = "education is required";
      errorObj.education = toastMsg;
      isValid = false;
    }

    if (!formData.life_style) {
      toastMsg = "life style details is required";
      errorObj.life_style = toastMsg;
      isValid = false;
    }

    if (!formData.past_detail) {
      toastMsg = "past details is required";
      errorObj.past_detail = toastMsg;
      isValid = false;
    }
    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    dispatch(setObErrors(errorObj));
    if (isValid) {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    setLoading(true);
    if (isEdit) {
      updateOnboardingUser({
        variables: {
          userId: formData.id,
          title: formData.title,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          mobile_no: formData.mobile_no,
          designation: formData.designation,
          manager: formData.manager,
          location: formData.location,
          info: formData.info,
          life_style: formData.life_style,
          education: formData.education,
          past_detail: formData.past_detail,
          wish_text: formData.wish_text,
        },
      }).then(async (res: FetchResult<UpdateObFormResponse>) => {
        if (res.data) {
          if (typeof file !== "string") {
            const imgRefId = formData.id;
            const newData = new FormData();
            newData.append("files", file);
            newData.append("ref", "api::onboarding.onboarding"); // optional, you need it if you want to link the image to an entry
            newData.append("refId", imgRefId); // optional, you need it if you want to link the image to an entry
            newData.append("field", "profile");
            const imageRes = await axios.post(
              `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
              newData
            );
            if (imageRes.status === 200) {
              showSnackBar("User Updated Successfully", "success");
              setTimeout(() => {
                handleClose();
              }, 500);
            }
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
      createOnboardingUser({
        variables: {
          title: formData.title,
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          mobile_no: formData.mobile_no,
          designation: formData.designation,
          manager: formData.manager,
          location: formData.location,
          info: formData.info,
          life_style: formData.life_style,
          education: formData.education,
          past_detail: formData.past_detail,
          wish_text: formData.wish_text,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: FetchResult<CreateObFormResponse>) => {
          if (res.data && res.data.createOnboarding) {
            const imgRefId = res.data.createOnboarding.data.id;
            const newData = new FormData();
            newData.append("files", file);
            newData.append("ref", "api::onboarding.onboarding"); // optional, you need it if you want to link the image to an entry
            newData.append("refId", imgRefId); // optional, you need it if you want to link the image to an entry
            newData.append("field", "profile");
            const imageRes = await axios.post(
              `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
              newData
            );
            if (imageRes.status === 200) {
              showSnackBar("User Added Successfully", "success");
              setTimeout(() => {
                handleClose();
              }, 500);
            }
          }
        })
        .catch((err: any) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };

  const handleClose = () => {
    dispatch(setSlider(false));
    setLoading(false);
  };

  return (
    <Slider
      headerProps={{
        heading: `${isEdit ? "Edit" : "Add"} Onbording User`,
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
        formData={formData}
        handleChange={handleChange}
        handleDropDown={handleDropDown}
        isEdit={isEdit}
      />
    </Slider>
  );
};

export default AddEditObForm;
