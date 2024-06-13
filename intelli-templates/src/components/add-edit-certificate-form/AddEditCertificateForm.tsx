import React from "react";
import Slider from "../slider/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch } from "redux-store/actions/modelActions";
import { setCertificateSlider } from "redux-store/actions/strapiActions";
import { useSelector } from "react-redux";
import { showSnackBar } from "utils/snackBarUtils";
import { FetchResult, useMutation } from "@apollo/client";
import {
  addEditITalkCertificateUser,
  iTalkCertificateUserError,
} from "redux-store/actions/iTalkCertificateFormActions";
import { CREATE_ITALK_CERTIFICATE_USER } from "graphQL/iTalk-certificate/createITalkCertificate";
import { UPDATE_ITALK_CERTIFICATE_USER } from "graphQL/iTalk-certificate/updateITalkCertificate";
import UserCertificateForm from "./UserCertificateForm";
import {
  CertificateErrObj,
  CertificateFormData,
  CreateItalkCertificateResponse,
  UpdateItalkCertificateResponse,
} from "./iAddEditCertificateForm";

const AddEditCertificateForm: React.FC = () => {
  const iTalkCertificateUserData = useSelector(
    (state: any) => state.iTalkCertificate.addEditiTalkCertificateUser
  );
  const formData: CertificateFormData =
    iTalkCertificateUserData.iTalkCertificateUserInfo;

  let isEdit: boolean = iTalkCertificateUserData.isEdit;
  let errors: CertificateErrObj = iTalkCertificateUserData.errors || {};

  const [createItalkCertificate] = useMutation(CREATE_ITALK_CERTIFICATE_USER);
  const [updateItalkCertificate] = useMutation(UPDATE_ITALK_CERTIFICATE_USER);

  const validateFieldForm = () => {
    const errorObj: CertificateErrObj = {} as CertificateErrObj;
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
    dispatch(iTalkCertificateUserError(errorObj));
    if (isValid) {
      handleOnSubmit();
    }
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      updateItalkCertificate({
        variables: {
          userId: formData.id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          certificate_name: formData.certificate_name,
          certificate_date: formData.certificate_date,
        },
      }).then((res: FetchResult<UpdateItalkCertificateResponse>) => {
        if (res.data && res.data.updateItalkCertificate) {
          showSnackBar(
            "iTalk Certificate User updated Successfully",
            "success"
          );
          setTimeout(() => {
            handleClose();
          }, 500);
        }
      });
    } else {
      const timeStamp = new Date().toISOString();

      createItalkCertificate({
        variables: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          certificate_name: formData.certificate_name,
          certificate_date: formData.certificate_date,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: FetchResult<CreateItalkCertificateResponse>) => {
          if (res.data && res.data.createItalkCertificate) {
            showSnackBar(
              "iTalk Certificate User Added Successfully",
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
    dispatch(addEditITalkCertificateUser(formObj));
  };

  const handleClose = () => {
    dispatch(setCertificateSlider(false));
  };

  return (
    <Slider
      headerProps={{
        heading: `${isEdit ? "Edit" : "Add"} Certificate`,
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

export default AddEditCertificateForm;
