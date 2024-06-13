import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setObData } from "redux-store/actions/obAction";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ONBOARDING_USER_DATA } from "graphQL/onbording-data/onbordingDataByID";
import NoRecordPage from "../../components/no-record/NoRecord";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { UPDATE_APPROVAL_STATUS } from "graphQL/onbording-data/updateOnboarding";
import { showSnackBar } from "utils/snackBarUtils";
import { setLoader } from "redux-store/actions/strapiActions";
import canvasToFile from "utils/canvasToFile";
import { openEmail } from "redux-store/actions/sendEmailActions";
import CommonFunctions from "utils/commonFunction";
import { Footer1 } from "components/common/footer/Footer";

const OnBoarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const obData: any = useSelector((state: any) => state.obId.obData);
  const [checkBoxObj, setCheckBoxObj] = useState({
    hrApproval: false,
    marketingApproval: false,
  });
  const { templateId } = useParams();
  const userId = localStorage.getItem("obdUserId");
  const canvasRef = useRef(null);

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  function getInitialStatus() {
    const statusObj = { ...checkBoxObj };
    statusObj["hrApproval"] = obData.hr_approval;
    statusObj["marketingApproval"] = obData.marketing_approval;
    return statusObj;
  }

  useEffect(() => {
    if (obData) {
      const approvalStatusObj = getInitialStatus();
      setCheckBoxObj({ ...approvalStatusObj });
      setfileName(obData.first_name);
    }
  }, [obData]);

  const handleClick = () => {
    navigate(`/`);
  };

  const handleImageType = (type: string) => {
    setFileFormate(type);
  };

  const [updateApprovalStatus] = useMutation(UPDATE_APPROVAL_STATUS);

  const handleCheckboxChange = (e: any, filedName: string) => {
    const staticObj = { ...checkBoxObj };
    staticObj[filedName] = e.target.checked;
    setCheckBoxObj({ ...staticObj });

    updateApprovalStatus({
      variables: {
        userId: userId,
        hrApproval: staticObj.hrApproval,
        marketingApproval: staticObj.marketingApproval,
      },
    }).then((res) => {
      if (res.data && res.data.updateOnboarding) {
        showSnackBar("Approval status updated successfully");
      }
    });
  };

  if (userId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(
      GET_ONBOARDING_USER_DATA,
      {
        variables: { userId },
      }
    );
    if (loading) return <></>;
    if (data.onboarding && data.onboarding.data) {
      const userData = data.onboarding.data.attributes;
      dispatch(setObData(userData));
    }
  }

  return (
    <>
      {userId ? (
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
            <Header className={`${templateId}`} />
            <Main />
            <Footer1 />
          </div>
        </>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under Onboarding employee list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
};

export default OnBoarding;
