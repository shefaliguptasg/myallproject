import React from "react";
import Slider from "../slider/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch } from "redux-store/actions/modelActions";
import { setLearningCertificateSlider } from "redux-store/actions/strapiActions";
import { useSelector } from "react-redux";
import { showSnackBar } from "utils/snackBarUtils";
import { FetchResult, useMutation } from "@apollo/client";
import UserCertificateForm from "../add-edit-certificate-form/UserCertificateForm";
import {
  LearningCertificateUserError,
  addEditLearningCertificateUser,
} from "redux-store/actions/learningCertificate";
import { CREATE_LEARNING_CERTIFICATE_USER } from "graphQL/learning-certificate/createLearningCertificate";
import { UPDATE_LEARNING_CERTIFICATE_USER } from "graphQL/learning-certificate/updateLearningCertificate";
import {
  CreateElearningCertificateResponse,
  ELearningCertificateErrObj,
  ELearningCertificateFormData,
  UpdateELearningCertificateResponse,
} from "./AddEditELearningForm.types";

const AddEditELearningForm = () => {
  const learningCertificateUserData = useSelector(
    (state: any) => state.learningCertificate.addEditLearningCertificateUser
  );
  const formData: ELearningCertificateFormData =
    learningCertificateUserData.learningCertificateUserInfo;

  const isEdit: boolean = learningCertificateUserData.isEdit;
  const errors: ELearningCertificateErrObj =
    learningCertificateUserData.errors || {};

  const [createLearningCertificate] = useMutation(
    CREATE_LEARNING_CERTIFICATE_USER
  );
  const [updateLearningCertificate] = useMutation(
    UPDATE_LEARNING_CERTIFICATE_USER
  );

  const validateFieldForm = () => {
    const errorObj: ELearningCertificateErrObj =
      {} as ELearningCertificateErrObj;
    let isValid = true,
      toastMsg = "";

    if (!formData.first_name) {
      toastMsg = "First name is required";
      errorObj.first_name = toastMsg;
      isValid = false;
    }
    if (!formData.last_name) {
      toastMsg = "Last name is required";
      errorObj.last_name = toastMsg;
      isValid = false;
    }
    if (!formData.certificate_name) {
      toastMsg = "Certificate name is required";
      errorObj.certificate_name = toastMsg;
      isValid = false;
    }
    if (!formData.certificate_date) {
      toastMsg = "Certificate date is required";
      errorObj.certificate_date = toastMsg;
      isValid = false;
    }

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    dispatch(LearningCertificateUserError(errorObj));
    if (isValid) {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateLearningCertificate({
        variables: {
          userId: formData.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          certificate_name: formData.certificate_name,
          certificate_date: formData.certificate_date,
        },
      }).then((res: FetchResult<UpdateELearningCertificateResponse>) => {
        if (res.data && res.data.updateLearningCertificate) {
          showSnackBar(
            "Learning Certificate User updated Successfully",
            "success"
          );
          setTimeout(() => {
            handleClose();
          }, 500);
        }
      });
    } else {
      const timeStamp = new Date().toISOString();

      createLearningCertificate({
        variables: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          certificate_name: formData.certificate_name,
          certificate_date: formData.certificate_date,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: FetchResult<CreateElearningCertificateResponse>) => {
          if (res.data && res.data.createLearningCertificate) {
            showSnackBar(
              "Learning Certificate User Added Successfully",
              "success"
            );
            setTimeout(() => {
              handleClose();
            }, 500);
          }
        })
        .catch((error) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formObj = { ...formData };
    const { name, value } = e.target;
    formObj[name] = value;
    dispatch(addEditLearningCertificateUser(formObj));
  };

  const handleClose = () => {
    dispatch(setLearningCertificateSlider(false));
  };

  return (
    <Slider
      headerProps={{
        heading: `${isEdit ? "Edit" : "Add"} Learning Certificate`,
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
      <UserCertificateForm
        errors={errors}
        formData={formData}
        handleChange={handleChange}
      />
    </Slider>
  );
};

export default AddEditELearningForm;
