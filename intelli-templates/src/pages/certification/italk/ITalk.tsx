import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import styles from "./italk.module.scss";
import DownloadTemplate from "components/download-template/DownloadTemplate";
import { dispatch } from "redux-store/actions/modelActions";
import { setLoader } from "redux-store/actions/strapiActions";
import html2canvas from "html2canvas";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import { showSnackBar } from "utils/snackBarUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GET_ITALK_CERTIFICATE_BY_ID } from "graphQL/iTalk-certificate/getITalkCertificateById";
import { useQuery } from "@apollo/client";
import { addEditITalkCertificateUser } from "redux-store/actions/iTalkCertificateFormActions";

import CertifacateImage from "../../../assets/images/Certificate-iTalk-background.jpg";
import CommonFunctions from "utils/commonFunction";

const ITalk = () => {
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  const iTalkCertificateId = localStorage.getItem("iTalkCertificateUserId");

  const handleImageType = (type: string) => {
    setFileFormate(type);
  };

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  if (iTalkCertificateId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(
      GET_ITALK_CERTIFICATE_BY_ID,
      {
        variables: { userId: iTalkCertificateId },
      }
    );

    if (loading) return <></>;
    if (data && data.italkCertificate.data) {
      let userDataObj = {};
      userDataObj["id"] = data.italkCertificate.data.id;
      userDataObj = {
        ...userDataObj,
        ...data.italkCertificate.data.attributes,
      };

      dispatch(addEditITalkCertificateUser(userDataObj));
    }
  }
  return (
    <>
      <DownloadTemplate
        handleSend={handleSend}
        handleDownload={handleDownload}
        handleImageType={handleImageType}
        fileFormate={fileFormate}
        checkBoxObj={{ hrApproval: false, marketingApproval: false }}
      />
      <div style={{ marginTop: "90px" }}></div>
      <div className={styles["certification-italk"]} ref={canvasRef}>
        <div className={styles["img-holder"]}>
          <img src={CertifacateImage} alt="imge" />
        </div>
        <div className={styles["italk-container"]}>
          <Header />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ITalk;
