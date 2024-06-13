import Slider from "../slider/Slider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from "@mui/icons-material/Close";
import { setTeaserSlider } from "redux-store/actions/teaserAction";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditTeaserFormContent from "./AddEditTeaserFormContent";
import {
  ITeaserFormData,
  ITeaserFormErrorData,
} from "./iAddEditTeaserInterface";
import { showSnackBar } from "utils/snackBarUtils";
import { CREATE_TEASER_USER } from "graphQL/teaser-data/createTeaserData";
import { UPDATE_TEASER_USER } from "graphQL/teaser-data/updateTeaserData";
import { useMutation } from "@apollo/client";
import axios from "axios";
import CommonFunctions from "utils/commonFunction";
const AddEditTeaserForm = () => {
  const isTeaserEdit = false;
  const isloading = false;
  const dispatch = useDispatch();
  const [createIntelliTeaser] = useMutation(CREATE_TEASER_USER);
  const [updateIntelliTeaser] = useMutation(UPDATE_TEASER_USER);
  const userTeaserData: any = useSelector(
    (state: any) => state.teaserInfo.addEditTeaserData.addEditTeaserInfo
  );
  const isEdit = useSelector(
    (state: any) => state.teaserInfo.addEditTeaserData.isEdit
  );
  const teaserId = CommonFunctions.getItemFromLocalStorage("teaserId");
  const [teaserFormData, setTeaserFormData] = useState<ITeaserFormData>({
    backgroundImgUrl: userTeaserData?.backgroundImgUrl,
    headerLogoImageUrl: userTeaserData?.headeLogoImageUrl,
    header_text: userTeaserData?.header_text,
    salutation: userTeaserData?.salutation,
    teaserSection: userTeaserData?.section,
    signature: userTeaserData?.signature,
    errors: {
      headerLogoImage: "",
      backgroundImage: "",
      header_text: "",
      salutation: "",
      teaserSection: [],
      signature: "",
    },
  });
  const handleChange = (e: any) => {
    if (e.target.name === "teaserSection") {
      teaserFormData["teaserSection"] = [...e.target.value];
      setTeaserFormData({ ...teaserFormData });
    } else {
      setTeaserFormData({
        ...teaserFormData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleClose = () => {
    dispatch(setTeaserSlider(false));
  };
  const handleAddSection = (teaserData: ITeaserFormData) => {
    setTeaserFormData({
      ...teaserFormData,
      teaserSection: teaserData.teaserSection,
    });
  };
  const handleSubmit = () => {
    const timeStamp = new Date().toISOString();
    if (isEdit) {
      updateIntelliTeaser({
        variables: {
          id: teaserId,
          header_text: teaserFormData.header_text,
          salutation: teaserFormData.salutation,
          signature: teaserFormData.signature,
          section: teaserFormData.teaserSection,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: any) => {
          if (res.data && res.data.updateIntelliTeaser.data.id) {
            const ref = "api::intelli-teaser.intelli-teaser";
            //upload background Image
            CommonFunctions.uploadImageFile(
              res.data.updateIntelliTeaser.data.id,
              teaserFormData.backgroundImgUrl,
              ref,
              "background_image",
              handleClose
            );
            //upload headerLogo image
            CommonFunctions.uploadImageFile(
              res.data.updateIntelliTeaser.data.id,
              teaserFormData.headerLogoImageUrl,
              ref,
              "header_logo",
              handleClose
            );
          }
        })
        .catch((error) => {
          showSnackBar("Something went wrong!", "error");
        });
    } else {
      createIntelliTeaser({
        variables: {
          header_text: teaserFormData.header_text,
          salutation: teaserFormData.salutation,
          signature: teaserFormData.signature,
          section: teaserFormData.teaserSection,
          hr_approval: true,
          marketing_approval: false,
          publishedAt: timeStamp,
        },
      })
        .then(async (res: any) => {
          if (res.data && res.data.createIntelliTeaser.data.id) {
            const ref = "api::intelli-teaser.intelli-teaser";
            //upload background Image
            CommonFunctions.uploadImageFile(
              res.data.createIntelliTeaser.data.id,
              teaserFormData.backgroundImgUrl,
              ref,
              "background_image",
              handleClose
            );
            //upload headerLogo image
            CommonFunctions.uploadImageFile(
              res.data.createIntelliTeaser.data.id,
              teaserFormData.headerLogoImageUrl,
              ref,
              "header_logo",
              handleClose
            );
          }
        })
        .catch((error) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };
  const validateFieldForm = () => {
    const errorObj: ITeaserFormErrorData = {
      backgroundImage: "",
      headerLogoImage: "",
      header_text: "",
      salutation: "",
      teaserSection: [],
      signature: "",
    };
    let isValid = true;
    let toastMsg = "";
    if (!teaserFormData.backgroundImgUrl) {
      toastMsg = "Please Add background Image";
      errorObj.backgroundImage = toastMsg;
      isValid = false;
    }
    if (!teaserFormData.headerLogoImageUrl) {
      toastMsg = "Please Add logo Image";
      errorObj.headerLogoImage = toastMsg;
      isValid = false;
    }
    if (!teaserFormData.header_text) {
      toastMsg = "header text is required";
      errorObj.header_text = toastMsg;
      isValid = false;
    }
    if (!teaserFormData.salutation) {
      toastMsg = "Salutation is required";
      errorObj.salutation = toastMsg;
      isValid = false;
    }

    const teaser_section: any = [];
    teaserFormData.teaserSection.map((ele: any) => {
      if (!ele) {
        toastMsg = "Section cannot be empty";
        isValid = false;
      } else {
        toastMsg = "";
      }
      teaser_section.push(toastMsg);
    });
    if (teaser_section.length) {
      errorObj.teaserSection = [...teaser_section];
    }

    if (toastMsg) {
      showSnackBar(toastMsg, "error");
    }
    setTeaserFormData({ ...teaserFormData, errors: errorObj });
    if (isValid) {
      handleSubmit();
    }
  };
  return (
    <Slider
      headerProps={{
        heading: `${isTeaserEdit ? "Edit" : "Add"} Teaser`,
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
      <AddEditTeaserFormContent
        handleChange={handleChange}
        handleAddSection={handleAddSection}
        teaserFormData={teaserFormData}
      ></AddEditTeaserFormContent>
    </Slider>
  );
};

export default AddEditTeaserForm;
