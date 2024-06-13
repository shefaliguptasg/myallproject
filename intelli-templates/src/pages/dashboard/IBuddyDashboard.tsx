import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_INTELLI_IBUDDY_LIST } from "graphQL/ibuddy-data/getIntelliIBuddyList";
import CommonFunctions from "utils/commonFunction";
import { setIBuddySlider } from "redux-store/actions/strapiActions";
import { GET_IBUDDY_BY_ID } from "graphQL/ibuddy-data/getBuddyById";
import {
  addEditIBuddyUser,
  setBuddyImages,
} from "redux-store/actions/iBuddyAction";
import { getFontUrl } from "utils/generalUtils";

const IBuddyDashboard = () => {
  const showSlider = useSelector((state: any) => state.strapi.showIBuddySlider);
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
  } = useQuery(GET_IBUDDY_BY_ID, {
    variables: { userId: userId },
  });

  useEffect(() => {
    if (userData && userData.intelliBuddy.data) {
      let userDataObj = {};
      let imgUrl: string | undefined = "";
      let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      userDataObj["id"] = userData.intelliBuddy.data.id;
      userDataObj = {
        ...userDataObj,
        ...userData.intelliBuddy.data.attributes,
      };

      if (
        userData.intelliBuddy.data.attributes &&
        userData.intelliBuddy.data.attributes.buddy_background?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.intelliBuddy.data.attributes.buddy_background.data.attributes
        );
      }

      dispatch(setBuddyImages({ fileData: imgUrl, imgKey: "buddyBackground" }));

      if (
        userData.intelliBuddy.data.attributes &&
        userData.intelliBuddy.data.attributes.buddy_background?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.intelliBuddy.data.attributes.buddy_background.data.attributes
        );
      }
      dispatch(
        setBuddyImages({ fileData: imgUrl, imgKey: "joineeBackground" })
      );

      dispatch(addEditIBuddyUser(userDataObj));
      dispatch(setIBuddySlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditIBuddyUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const updateiBuddyId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("iBuddydUserId", id);
    navigate(`/ibuddy-template`);
  };
  const handleiBuddySlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(addEditIBuddyUser({}));
    dispatch(setIBuddySlider(true));
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
  } = useQuery(GET_INTELLI_IBUDDY_LIST, {
    variables: {
      pageNum,
      hrApproval: loggedUserData?.role === "marketing" ? true : hrApproval,
      marketingApproval:
        loggedUserData?.role === "marketing" ? false : marketingApproval,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const iBuddyUserList = userList.intelliBuddies.data;
    if (iBuddyUserList.length) {
      CommonFunctions.setItemInLocalStorage(
        "iBuddyUserId",
        iBuddyUserList[0].id
      );
      pageCount = userList.intelliBuddies.meta.pagination.pageCount;
      currentPage = userList.intelliBuddies.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      iBuddyUserList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          first_name: item.attributes.joinee_first_name,
          hr_approval: item.attributes.hr_approval,
          marketing_approval: item.attributes.joinee_marketing_approval,
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
      onClickUser={updateiBuddyId}
      handleEditTemplate={handleEditIBuddyUser}
      handleAddSlider={handleiBuddySlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default IBuddyDashboard;
