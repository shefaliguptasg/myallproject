import { useEffect, useRef, useState } from "react";
import Header from "./LeapHeader";
import ILeapContent from "./iLeapContent";
import styles from "./iLeapTemplate.module.scss";
import DownloadTemplate from "../../components/download-template/DownloadTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ILEAP_USER_ID_DATA } from "graphQL/ileap-data/iLeapById";
import { setILeapData } from "redux-store/actions/iLeapAction";
import NoRecordPage from "../../components/no-record/NoRecord";
import HorizontalBar from "../../components/common/horizontalbar/HorizontalBar";
import CommonFunctions from "utils/commonFunction";
import { Footer1 } from "components/common/footer/Footer";
import LeapHeader from "./LeapHeader";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileFormate, setfileFormate] = useState("jpg");
  const [fileName, setfileName] = useState("");

  const canvasRef = useRef(null);

  const iLeapData: any = useSelector((state: any) => state.iLeapId.iLeapData);

  const iLeapId = localStorage.getItem("iLeapUserId"); //

  // *** Image Type Handler ***
  const handleImageType = (type: string) => {
    setfileFormate(type);
  };

  const handleClick = () => {
    navigate("/");
  };

  //***** Download Handler ****

  const handleDownload = () => {
    CommonFunctions.downloadTemp(canvasRef, fileName, fileFormate);
  };

  // ***** Send Handler *****
  const handleSend = () => {
    CommonFunctions.sendTemplate(canvasRef, fileName, fileFormate);
  };

  useEffect(() => {
    if (iLeapData) {
      setfileName(iLeapData.first_paragraph);
    }
  }, [iLeapData]);
  if (iLeapId) {
    useEffect(() => {
      refetch();
    }, []);
    const { loading, error, data, refetch } = useQuery(GET_ILEAP_USER_ID_DATA, {
      variables: { userId: iLeapId },
    });
    if (loading) return <></>;
    if (data.intelliILeap && data.intelliILeap.data) {
      const userData = data.intelliILeap.data.attributes;
      dispatch(setILeapData(userData));
    }
  }

  return (
    <>
      {iLeapId ? (
        <>
          <DownloadTemplate
            handleDownload={handleDownload}
            handleSend={handleSend}
            handleImageType={handleImageType}
            fileFormate={fileFormate}
            checkBoxObj={() => {}}
          />
          <div style={{ marginTop: "90px" }}></div>
          <div ref={canvasRef}>
            <LeapHeader />
            <HorizontalBar className={`${styles["Horizontal-bar"]}`} />
            <ILeapContent />
            <Footer1 />
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

export default Main;
