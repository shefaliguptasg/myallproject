import React, { useEffect, useRef, useState } from "react";
import styles from "./iBuddyTemplate.module.scss";
import Header from "./Header";
import { IBuddyMain, IBuddyMainNew } from "./Main";
import Footer from "./Footer";
import { useMutation, useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setBuddyData } from "redux-store/actions/iBuddyAction";
import { GET_IBUDDY_BY_ID } from "graphQL/ibuddy-data/getBuddyById";
import { useNavigate } from "react-router-dom";
import NoRecordPage from "../../components/no-record/NoRecord";
import { Radio } from "intelli-ui-components-library";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import html2canvas from "html2canvas";
import { setLoader } from "redux-store/actions/strapiActions";
import { UPDATE_IBUDDY_USER } from "graphQL/ibuddy-data/updateIBuddy";
import { showSnackBar } from "utils/snackBarUtils";
import canvasToFile from "utils/canvasToFile";
import EmailForm from "../../components/send-email-form/EmailForm";
import { openEmail } from "redux-store/actions/sendEmailActions";
import CommonFunctions from "utils/commonFunction";

const IBuddy = () => {
  const buddyUserData = useSelector((state: any) => state.iBuddyId.iBuddyData);
  const [selectedValue, setSelectedValue] = useState("buddy");
  const [fileFormate, setFileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const [checkBoxObj, setCheckBoxObj] = useState({
    hrApproval: false,
    marketingApproval: false,
  });
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("iBuddydUserId");

  const handleClick = () => {
    navigate(`/`);
  };

  const handleImageType = (type: string) => {
    setFileFormate(type);
  };

  function getInitialStatus() {
    const statusObj = { ...checkBoxObj };
    statusObj["hrApproval"] = buddyUserData.hr_approval;
    statusObj["marketingApproval"] = buddyUserData.marketing_approval;
    return statusObj;
  }

  useEffect(() => {
    if (buddyUserData) {
      const approvalStatusObj = getInitialStatus();
      setCheckBoxObj({ ...approvalStatusObj });
      setfileName(buddyUserData.joinee_first_name);
    }
  }, [buddyUserData]);

  const [updateIntelliIbuddy] = useMutation(UPDATE_IBUDDY_USER);
  const handleCheckboxChange = (e: any, filedName: string) => {
    const staticObj = { ...checkBoxObj };
    staticObj[filedName] = e.target.checked;
    setCheckBoxObj({ ...staticObj });

    updateIntelliIbuddy({
      variables: {
        userId: userId,
        hr_approval: staticObj.hrApproval,
        marketing_approval: staticObj.marketingApproval,
      },
    }).then((res) => {
      if (res.data && res.data.updateIntelliBuddy) {
        showSnackBar("Approval status updated successfully", "success");
      }
    });
  };

  //** Download Handler
  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  const handleRadioChange = (e: any, value: string) => {
    setSelectedValue(value);
  };

  if (userId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_IBUDDY_BY_ID, {
      variables: { userId: userId },
    });
    if (loading) return <></>;
    if (data.intelliBuddy && data.intelliBuddy.data) {
      const userData = data.intelliBuddy.data.attributes;
      dispatch(setBuddyData(userData));
    }
  }
  return (
    <>
      {userId ? (
        <>
          <DownloadTemplate
            handleDownload={handleDownload}
            handleSend={handleSend}
            handleImageType={handleImageType}
            fileFormate={fileFormate}
            checkBoxObj={checkBoxObj}
            handleCheckboxChange={handleCheckboxChange}
          />

          <div className={styles["template-select"]}>
            <div className={styles["select-type"]}>
              <span className="font-14 fs-b text-white mgr-10">
                Select template
              </span>
              <div
                className="mgr-5"
                onClick={(e) => handleRadioChange(e, "buddy")}
              >
                <Radio
                  bgColor="default"
                  size="sm"
                  checked={selectedValue == "buddy"}
                  label="For Buddy"
                />
              </div>
              <div onClick={(e) => handleRadioChange(e, "joinee")}>
                <Radio
                  bgColor="default"
                  size="sm"
                  checked={selectedValue == "joinee"}
                  label="For Joinee"
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: "8.5rem" }}></div>

          <div className={styles["container"]} ref={canvasRef}>
            <Header templateType={selectedValue} />
            {selectedValue === "buddy" ? <IBuddyMainNew /> : <IBuddyMain />}
            <Footer />
          </div>
        </>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under iBuddy employee list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
};

export default IBuddy;
