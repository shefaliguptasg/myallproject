import React from "react";
import { useEffect, useRef, useState } from "react";
import TeaserHeader from "./TeaserHeader";
import { dispatch } from "redux-store/actions/modelActions";
import { useNavigate } from "react-router-dom";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import HorizontalBar from "components/common/horizontalbar/HorizontalBar";
import { useQuery } from "@apollo/client";
import { GET_TEASER_DATA_BY_ID } from "graphQL/teaser-data/getTeaserData";
import { setTeaserData } from "redux-store/actions/teaserAction";
import CommonFunctions from "utils/commonFunction";
import ITeaserContent from "./teaserContent";
import NoRecordPage from "components/no-record/NoRecord";
import { Footer1 } from "components/common/footer/Footer";

const Main = () => {
  const navigate = useNavigate();
  const [fileFormat, setfileFormat] = useState("jpg");
  const [fileName, setfileName] = useState("");
  const [checkBoxObj, setCheckBoxObj] = useState({
    hrApproval: false,
    marketingApproval: false,
  });
  const canvasRef = useRef(null);
  const teaserId = CommonFunctions.getItemFromLocalStorage("teaserId"); //
  const handleImageType = (type: string) => {
    setfileFormat(type);
  };

  //***** Download Handler ****

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormat);
  };

  // ***** Send Handler *****

  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormat);
  };

  const handleCheckboxChange = (e: any, fileName: string) => {
    const staticObj = { ...checkBoxObj };
    staticObj[fileName] = e.target.checked;
    setCheckBoxObj({ ...staticObj });
  };

  if (teaserId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_TEASER_DATA_BY_ID, {
      variables: { teaserId },
    });
    if (loading) return <></>;
    if (data.intelliTeaser && data.intelliTeaser.data) {
      const tndUserData = data.intelliTeaser.data.attributes;
      dispatch(setTeaserData(tndUserData));
    }
  }
  //navigate to home page
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <>
      {teaserId ? (
        <div>
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
            <TeaserHeader />
            <HorizontalBar />
            <ITeaserContent />
            <Footer1 />
          </div>
        </div>
      ) : (
        <NoRecordPage
          tittle="Employee Not Selected!!!"
          subTitle="Please select Employee from Home page under Teaser  list!"
          clickHandler={handleClick}
        />
      )}
    </>
  );
};

export default Main;
