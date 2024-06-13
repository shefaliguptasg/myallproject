import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ITALK_USER_ID_DATA } from "graphQL/italk-data/iTalkUserId";
import NoRecordPage from "../../components/no-record/NoRecord";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { UPDATE_APPROVAL_STATUS } from "graphQL/onbording-data/updateOnboarding";
import { showSnackBar } from "utils/snackBarUtils";
import { setLoader } from "redux-store/actions/strapiActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UPDATE_INTELLI_TALK } from "graphQL/italk-data/updateItalk";
import { setITalkData } from "redux-store/actions/iTalkAction";
import Main from "./Main";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import CommonFunctions from "utils/commonFunction";
import styles from "./iTalkTemplate.module.scss";
import iTalk_svg from "../../assets/images/italk-logo.svg";
import { getFontUrl } from "utils/generalUtils";
import ITalkHeader from "./ITalkHeader";

const ITalkTemplate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const iTalkData: any = useSelector((state: any) => state.iTalkId.iTalkData);
  const iTalkId = localStorage.getItem("iTalkUserId");
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const [checkBoxObj, setCheckBoxObj] = useState({
    hrApproval: false,
    marketingApproval: false,
  });
  const canvasRef = useRef(null);
  useEffect(() => {
    if (iTalkData) {
      const approvalStatusObj = getInitialStatus();
      setCheckBoxObj({ ...approvalStatusObj });
      setfileName(iTalkData.first_name);
    }
  }, [iTalkData]);

  const handleClick = () => {
    navigate(`/`);
  };

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };
  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };
  const handleImageType = (type: string) => {
    setFileFormate(type);
  };
  function getInitialStatus() {
    const statusObj = { ...checkBoxObj };
    statusObj["hrApproval"] = iTalkData.hr_approval;
    statusObj["marketingApproval"] = iTalkData.marketing_approval;
    return statusObj;
  }

  const [updateItalkApprovalStatus] = useMutation(UPDATE_INTELLI_TALK);
  const handleCheckboxChange = (e: any, filedName: string) => {
    const staticObj = { ...checkBoxObj };
    staticObj[filedName] = e.target.checked;
    setCheckBoxObj({ ...staticObj });
    updateItalkApprovalStatus({
      variables: {
        userId: iTalkId,
        hr_approval: staticObj.hrApproval,
        marketing_approval: staticObj.marketingApproval,
      },
    }).then((res: any) => {
      if (res.data && res.data.updateIntelliTalk) {
        showSnackBar("Approval status updated successfully", "success");
      }
    });
  };

  if (iTalkId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_ITALK_USER_ID_DATA, {
      variables: { userId: iTalkId },
    });
    if (loading) return <></>;
    if (data.intelliTalk && data.intelliTalk.data) {
      const userData = data.intelliTalk.data.attributes;
      dispatch(setITalkData(userData));
    }
  }
  return (
    <>
      {iTalkId ? (
        <>
          <DownloadTemplate
            handleSend={handleSend}
            handleDownload={handleDownload}
            handleImageType={handleImageType}
            fileFormate={fileFormate}
            checkBoxObj={checkBoxObj}
            handleCheckboxChange={handleCheckboxChange}
          />
          <div style={{ marginTop: "90px" }}></div>
          <div ref={canvasRef}>
            <ITalkHeader></ITalkHeader>

            <Main />
          </div>
        </>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under iTalk employee list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
};

export default ITalkTemplate;
