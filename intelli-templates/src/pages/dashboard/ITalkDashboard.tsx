import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ITALK_LIST_DATA } from "graphQL/italk-data/iTalkList";
import CommonFunctions from "utils/commonFunction";
import {
  addEditItalkUser,
  setItalkImages,
} from "redux-store/actions/iTalkAction";
import { setItalkSlider } from "redux-store/actions/strapiActions";
import { getFontUrl } from "utils/generalUtils";
import { GET_ITALK_USER_ID_DATA } from "graphQL/italk-data/iTalkUserId";

const ITalkCertificateDashboard = () => {
  const showSlider = useSelector((state: any) => state.strapi.showItalkSlider);
  const updatedStatus = useSelector((state: any) => state.obId.approvalStatus);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const headerDataList: any = [];
  const { hrApproval, marketingApproval } = updatedStatus;
  let loggedUserData: any = CommonFunctions.getItemFromLocalStorage("userInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery(GET_ITALK_USER_ID_DATA, {
    variables: { userId: userId },
  });

  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.intelliTalk.data) {
      let userDataObj = {};
      let imgUrl: string | undefined = "";
      userDataObj["id"] = userData.intelliTalk.data.id;
      userDataObj = {
        ...userDataObj,
        ...userData.intelliTalk.data.attributes,
      };
      const strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      if (
        userData.intelliTalk.data.attributes &&
        userData.intelliTalk.data.attributes.profile?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.intelliTalk.data.attributes.profile.data.attributes
        );
      }
      dispatch(
        setItalkImages({
          imgKey: "profileImage",
          fileData: imgUrl,
        })
      );
      if (
        userData.intelliTalk.data.attributes &&
        userData.intelliTalk.data.attributes.background?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.intelliTalk.data.attributes.background.data.attributes
        );
      }
      dispatch(
        setItalkImages({
          imgKey: "backgroundImage",
          fileData: imgUrl,
        })
      );
      dispatch(addEditItalkUser(userDataObj));
      dispatch(setItalkSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditiTalkUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleItalkAddSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(addEditItalkUser({}));
    dispatch(setItalkSlider(true));
  };

  const updateiTalkId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("iTalkUserId", id);
    navigate(`/italk`);
  };

  useEffect(() => {
    if (!showSlider) {
      userListRefetch();
    }
  }, [showSlider]);

  const {
    data: userList,
    loading: userListLoading,
    error: userListError,
    refetch: userListRefetch,
  } = useQuery(GET_ITALK_LIST_DATA, {
    variables: {
      pageNum,
      hrApproval: loggedUserData?.role === "marketing" ? true : hrApproval,
      marketingApproval:
        loggedUserData?.role === "marketing" ? false : marketingApproval,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const iTalkUserList = userList.intelliTalks.data;

    if (iTalkUserList.length) {
      CommonFunctions.setItemInLocalStorage("iTalkUserId", iTalkUserList[0].id);
      pageCount = userList.intelliTalks.meta.pagination.pageCount;
      currentPage = userList.intelliTalks.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      iTalkUserList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          first_name: item.attributes.first_name,
          designation: item.attributes.designation,
          createdAt: item.attributes.createdAt,
        });
      });
    }
  }

  return (
    <EmployeeTable
      userData={headerDataList}
      pageCount={pageCount}
      currentPage={currentPage}
      onClickUser={updateiTalkId}
      handleEditTemplate={handleEditiTalkUser}
      handleAddSlider={handleItalkAddSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default ITalkCertificateDashboard;
