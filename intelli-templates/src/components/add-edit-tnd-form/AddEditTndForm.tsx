import React, { useState } from "react";
import Slider from "../slider/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { dispatch } from "redux-store/actions/modelActions";
import { setTndSlider } from "redux-store/actions/strapiActions";
import TndForm from "./UserTndForm";
import { useDispatch, useSelector } from "react-redux";
import { addEditTndUser, setTndErrors } from "redux-store/actions/tndActions";
import { showSnackBar } from "utils/snackBarUtils";
import { useMutation } from "@apollo/client";
import { CREATE_TND_USER } from "graphQL/tnd-user/createTndUser";
import axios from "axios";
import { UPDATE_TND_USER } from "graphQL/tnd-user/updateTndUser";

const AddEditTndForm = () => {
  const [isloading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const file = useSelector((state: any) => state.strapi.imgInfo);

  const tndUserData = useSelector((state: any) => state.tndInfo.addEditTndUser);
  const isEdit = tndUserData.isEdit;

  const formData = tndUserData.tndUserInfo;

  const errors = tndUserData.errors || {};
  const [createTndUser] = useMutation(CREATE_TND_USER);
  const [updateTndUser] = useMutation(UPDATE_TND_USER);

  // Validations
  const validateFieldForm = () => {
    const errorObj: any = {};
    let isValid = true;
    let toastMsg = "";
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

    if (!formData.designation) {
      toastMsg = "Designation is required";
      errorObj.designation = toastMsg;
      isValid = false;
    }
    const td_section: any = [];
    formData.td_section.map((ele: any) => {
      if (!ele) {
        toastMsg = "Section cannot be empty";
        isValid = false;
      } else {
        toastMsg = "";
      }
      td_section.push(toastMsg);
    });
    if (td_section.length) {
      errorObj.td_section = [...td_section];
    }

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    dispatch(setTndErrors(errorObj));
    if (isValid) {
      handleSubmit();
    }
  };

  // Handlers
  const handleChange = (e: any) => {
    const formObj = { ...formData };
    const { name, value } = e.target;
    formObj[name] = value;
    dispatch(addEditTndUser(formObj));
  };

  const handleSubmit = () => {
    setLoading(true);
    if (isEdit) {
      updateTndUser({
        variables: {
          tndUserId: formData.id,
          title: formData.title,
          first_name: formData.first_name,
          last_name: formData.last_name,
          designation: formData.designation,
          td_section: formData.td_section,
        },
      }).then(async (res) => {
        if (res.data) {
          if (typeof file !== "string") {
            const imgRefId = formData.id;
            const newData = new FormData();
            newData.append("files", file);
            newData.append("ref", "api::intelli-tnd.intelli-tnd"); // optional, you need it if you want to link the image to an entry
            newData.append("refId", imgRefId); // optional, you need it if you want to link the image to an entry
            newData.append("field", "profile");
            const imgRes = await axios.post(
              `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
              newData
            );
            if (imgRes.status === 200) {
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
      createTndUser({
        variables: {
          title: formData.title,
          first_name: formData.first_name,
          last_name: formData.last_name,
          designation: formData.designation,
          td_section: formData.td_section,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      })
        .then(async (res) => {
          if (res.data && res.data.createIntelliTnd) {
            const imgRefId = res.data.createIntelliTnd.data.id;
            const newData = new FormData();
            newData.append("files", file);
            newData.append("ref", "api::intelli-tnd.intelli-tnd"); // optional, you need it if you want to link the image to an entry
            newData.append("refId", imgRefId); // optional, you need it if you want to link the image to an entry
            newData.append("field", "profile");
            const imgRes = await axios.post(
              `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
              newData
            );
            if (imgRes.status === 200) {
              showSnackBar("User Added Successfully", "success");
              setTimeout(() => {
                handleClose();
              }, 500);
            }
          }
        })
        .catch((err: any) => {
          showSnackBar("Something went wron!", "error");
        });
    }
  };

  const handleClose = () => {
    dispatch(setTndSlider(false));
    setLoading(false);
  };

  return (
    <div>
      <Slider
        headerProps={{
          heading: `${isEdit ? "Edit" : "Add"} Apperciation User`,
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
        <TndForm
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          isEdit={isEdit}
        />
      </Slider>
    </div>
  );
};
export default AddEditTndForm;
