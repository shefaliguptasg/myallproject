import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useNavigate } from "react-router-dom";
import CommonFunctions from "utils/commonFunction";
import { useQuery } from "@apollo/client";
import { GET_ONBOARDING_LIST_DATA } from "graphQL/onbording-data/onbordingData";
import { GET_ONBOARDING_USER_DATA } from "graphQL/onbording-data/onbordingDataByID";
import { useSelector, useDispatch } from "react-redux";
import { addEditObUser } from "redux-store/actions/obAction";
import { UploadImage, setSlider } from "redux-store/actions/strapiActions";
import { getFontUrl } from "utils/generalUtils";

type onBordingProps = {
  checkBoxObj: Record<string, boolean>;
};

function OnBoardingDashBoard({ checkBoxObj }: onBordingProps) {
  const showSlider = useSelector((state: any) => state.strapi.showSlider);
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const headerDataList: any = [];
  let loggedUserData: any = CommonFunctions.getItemFromLocalStorage("userInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }
  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery(GET_ONBOARDING_USER_DATA, {
    variables: { userId },
  });

  useEffect(() => {
    if (userData && userData.onboarding.data) {
      let userDataObj = {};
      let imgUrl: string | undefined = "";
      userDataObj["id"] = userData.onboarding.data.id;
      userDataObj = { ...userDataObj, ...userData.onboarding.data.attributes };
      let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      if (
        userData.onboarding.data.attributes &&
        userData.onboarding.data.attributes.profile?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.onboarding.data.attributes.profile.data.attributes
        );
      }
      dispatch(UploadImage(imgUrl));
      dispatch(addEditObUser(userDataObj));
      dispatch(setSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const updateObId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("obdUserId", id);
    navigate(`/onbording/template1`);
  };

  const handleEditObUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };
  const handleSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(UploadImage(""));
    dispatch(addEditObUser({}));
    dispatch(setSlider(true));
  };
  useEffect(() => {
    if (!showSlider) {
      refetch();
    }
  }, [showSlider]);

  //getting onbording Data
  const { loading, error, data, refetch } = useQuery(GET_ONBOARDING_LIST_DATA, {
    variables: {
      pageNum,
      hrApproval:
        loggedUserData?.role === "marketing" ? true : checkBoxObj.hrApproval,
      marketingApproval:
        loggedUserData?.role === "marketing"
          ? false
          : checkBoxObj.marketingApproval,
    },
  });

  if (loading) return <></>;

  if (data) {
    const userData = data.onboardings.data;
    if (userData.length) {
      CommonFunctions.setItemInLocalStorage("obdUserId", userData[0].id);
      pageCount = data.onboardings.meta.pagination.pageCount;
      currentPage = data.onboardings.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      userData.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          ...item.attributes,
          hr_approval: item.attributes.hr_approval,
          marketing_approval: item.attributes.marketing_approval,
        });
      });
    }
  }

  return (
    <EmployeeTable
      userData={headerDataList}
      pageCount={pageCount}
      currentPage={currentPage}
      onClickUser={updateObId}
      handleEditTemplate={handleEditObUser}
      handleAddSlider={handleSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
}

export default OnBoardingDashBoard;
