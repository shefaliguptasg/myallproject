import React, { useEffect, useRef, useState } from "react";
import AppreciationHeader from "./AppreciationHeader";
// import HorizontalBar from "./HorizontalBar";
import HorizontalBar from "../../components/common/horizontalbar/HorizontalBar";
import Main from "./Main";
import styles from "./appreciation.module.scss";
import { GET_TND_USER_BY_ID } from "graphQL/tnd-user/getTndUserId";
import { useMutation, useQuery } from "@apollo/client";
import { setTndData } from "redux-store/actions/tndActions";
import { useDispatch, useSelector } from "react-redux";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "redux-store/actions/strapiActions";
import { UPDATE_TND_APPROVAL_STATUS } from "graphQL/tnd-user/updateTnd";
import { showSnackBar } from "utils/snackBarUtils";
import NoRecordPage from "../../components/no-record/NoRecord";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import CommonFunctions from "utils/commonFunction";
import { Footer1 } from "components/common/footer/Footer";

function TndTemplate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fileFormat, setFileFormat] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const [checkBoxObj, setCheckBoxObj] = useState({
    hrApproval: false,
    marketingApproval: false,
  });
  const tndData: any = useSelector((state: any) => state.tndInfo.tndData);

  const { templateId } = useParams();

  const tndUserId = localStorage.getItem("tndUserId");

  const canvasRef = useRef(null);

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormat);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormat);
  };

  //handle image type
  const handleImageType = (type: string) => {
    setFileFormat(type);
  };

  function getInitialStatus() {
    const statusObj = { ...checkBoxObj };
    statusObj["hrApproval"] = tndData.hr_approval;
    statusObj["marketingApproval"] = tndData.marketing_approval;
    return statusObj;
  }

  useEffect(() => {
    if (tndData) {
      const approvalStatusObj = getInitialStatus();
      setCheckBoxObj({ ...approvalStatusObj });
      setfileName(tndData.first_name);
    }
  }, [tndData]);

  const handleClick = () => {
    navigate(`/`);
  };

  const [updateTndApprovalStatus] = useMutation(UPDATE_TND_APPROVAL_STATUS);

  const handleCheckboxChange = (e: any, filedName: string) => {
    const staticObj = { ...checkBoxObj };
    staticObj[filedName] = e.target.checked;
    setCheckBoxObj({ ...staticObj });

    updateTndApprovalStatus({
      variables: {
        tndUserId: tndUserId,
        hrApproval: staticObj.hrApproval,
        marketingApproval: staticObj.marketingApproval,
      },
    }).then((res) => {
      if (res.data && res.data.updateIntelliTnd) {
        showSnackBar("Approval status updated successfully", "success");
      }
    });
  };

  if (tndUserId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_TND_USER_BY_ID, {
      variables: { tndUserId },
    });
    if (loading) return <></>;
    if (data.intelliTnd && data.intelliTnd.data) {
      const tndUserData = data.intelliTnd.data.attributes;
      dispatch(setTndData(tndUserData));
    }
  }

  return (
    <>
      {tndUserId ? (
        <div className={styles["container"]}>
          <DownloadTemplate
            handleSend={handleSend}
            handleDownload={handleDownload}
            handleImageType={handleImageType}
            fileFormate={fileFormat}
            checkBoxObj={checkBoxObj}
            handleCheckboxChange={handleCheckboxChange}
          />
          <div style={{ marginTop: "90px" }}></div>
          <div ref={canvasRef}>
            {/* <Header className={`${templateId}`} /> */}
            <AppreciationHeader />
            <HorizontalBar />
            <Main />
            <Footer1 />
          </div>
        </div>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under Tnd employee list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
}

export default TndTemplate;
