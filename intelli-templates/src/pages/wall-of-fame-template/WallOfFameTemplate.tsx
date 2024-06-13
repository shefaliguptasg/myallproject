import React, { useEffect, useRef, useState } from "react";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./wallOfFameTemplate.module.scss";
import { useDispatch } from "react-redux";
import { setLoader } from "redux-store/actions/strapiActions";
import html2canvas from "html2canvas";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import { showSnackBar } from "utils/snackBarUtils";
import { GET_WALL_OF_FAME_BY_ID } from "graphQL/wall-of-fame-data/getWallOfFameById";
import { useQuery } from "@apollo/client";
import { addEditWallOfFameUser } from "redux-store/actions/wallOfFameAction";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import CommonFunctions from "utils/commonFunction";
function WallOfFameTemplate() {
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setFileName] = useState("");
  const canvasRef = useRef(null);
  const wallOfFameId = localStorage.getItem("wallOfFameUserId");
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

  if (wallOfFameId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_WALL_OF_FAME_BY_ID, {
      variables: { userId: wallOfFameId },
    });

    if (loading) return <></>;
    if (data && data.intelliWof.data) {
      let userDataObj = {};
      userDataObj["id"] = data.intelliWof.data.id;
      userDataObj = {
        ...userDataObj,
        userData: data.intelliWof.data.attributes.user_data,
        quarter_year: data.intelliWof.data.attributes.quarter_year,
      };
      dispatch(addEditWallOfFameUser(userDataObj));
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
      <div ref={canvasRef} className={styles["wrapper"]}>
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default WallOfFameTemplate;
