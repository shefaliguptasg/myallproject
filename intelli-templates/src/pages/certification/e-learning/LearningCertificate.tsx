import React, { useEffect, useRef, useState } from "react";
import styles from "./learningCertificate.module.scss";
import DownloadTemplate from "components/download-template/DownloadTemplate";
import { setLoader } from "redux-store/actions/strapiActions";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import { showSnackBar } from "utils/snackBarUtils";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";

import LearningTemplate from "./LearningTemplate";
import { GET_LEARNING_CERTIFICATE_BY_ID } from "graphQL/learning-certificate/getLearningCertificateById";
import { addEditLearningCertificateUser } from "redux-store/actions/learningCertificate";
import CommonFunctions from "utils/commonFunction";

const LearningCertificate = () => {
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const dispatch = useDispatch();
  const { learningId } = useParams();

  const canvasRef = useRef(null);

  const LearningCertificateId = localStorage.getItem(
    "LearningCertificateUserId"
  );

  const handleImageType = (type: string) => {
    setFileFormate(type);
  };

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  if (LearningCertificateId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(
      GET_LEARNING_CERTIFICATE_BY_ID,
      {
        variables: { userId: LearningCertificateId },
      }
    );

    if (loading) return <></>;
    if (data && data.learningCertificate.data) {
      let userDataObj = {};
      userDataObj["id"] = data.learningCertificate.data.id;
      userDataObj = {
        ...userDataObj,
        ...data.learningCertificate.data.attributes,
      };

      dispatch(addEditLearningCertificateUser(userDataObj));
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
        // handleCheckboxChange={handleCheckboxChange}
      />
      <div style={{ marginTop: "90px" }}></div>
      <div className={styles["certification-learning"]} ref={canvasRef}>
        <div className={styles["img-holder"]}>
          <img
            src={
              learningId == "learning1"
                ? "http://template.intelliswift.com:1337/uploads/bg2_8134998a58.jpg"
                : "http://template.intelliswift.com:1337/uploads/bg1_4455102c92.jpg"
            }
            alt="imge"
          />
        </div>
        <div className={styles["learning-container"]}>
          <LearningTemplate />
        </div>
      </div>
    </>
  );
};

export default LearningCertificate;
