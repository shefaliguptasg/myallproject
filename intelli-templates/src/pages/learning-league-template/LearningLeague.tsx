import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import LearningLeagueMain from "./Main";
import HorizontalBar from "../../components/common/horizontalbar/HorizontalBar";
import { useDispatch } from "react-redux";
import { addEditLearningUser } from "redux-store/actions/learningAction";
import { useQuery } from "@apollo/client";
import { GET_LEARNING_BY_ID } from "graphQL/learning-data/getLearningById";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { setLoader } from "redux-store/actions/strapiActions";
import { openEmail } from "redux-store/actions/sendEmailActions";
import { showSnackBar } from "utils/snackBarUtils";
import canvasToFile from "utils/canvasToFile";
import styles from "./learningLeague.module.scss";
import CommonFunctions from "utils/commonFunction";
import { Footer2 } from "components/common/footer/Footer";

const LearningLeague = () => {
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef(null);
  const learningId = localStorage.getItem("learningLeagueUserId");
  const dispatch = useDispatch();

  const handleImageType = (type: string) => {
    setFileFormate(type);
  };

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  if (learningId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_LEARNING_BY_ID, {
      variables: { userId: learningId },
    });

    if (loading) return <></>;
    if (data && data.learningLeague.data) {
      let userDataObj = {};
      userDataObj["id"] = data.learningLeague.data.id;
      userDataObj = {
        ...userDataObj,
        userData: data.learningLeague.data.attributes.user_data,
        sectionData: data.learningLeague.data.attributes.section_data,
      };
      dispatch(addEditLearningUser(userDataObj));
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
      <div ref={canvasRef}>
        <Header />
        <HorizontalBar className={`${styles["Horizontal-bar"]}`} />
        <LearningLeagueMain />
        <Footer2 />
      </div>
    </>
  );
};

export default LearningLeague;
