import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommonFunctions from "utils/commonFunction";

import { setCertificateSlider } from "redux-store/actions/strapiActions";
import { GET_ITALK_CERTIFICATE_BY_ID } from "graphQL/iTalk-certificate/getITalkCertificateById";
import { GET_ITALK_CERTIFICATE_LIST } from "graphQL/iTalk-certificate/getITalkCertificateList";
import { addEditITalkCertificateUser } from "redux-store/actions/iTalkCertificateFormActions";

const ITalkCertificateDashboard = () => {
  const showSlider = useSelector((state: any) => state.strapi.showItalkSlider);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const headerDataList: any = [];
  let loggedUserData: any = CommonFunctions.getItemFromLocalStorage("userInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery(GET_ITALK_CERTIFICATE_BY_ID, {
    variables: { userId: userId },
  });

  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.italkCertificate.data) {
      let userDataObj = {};
      userDataObj["id"] = userData.italkCertificate.data.id;
      userDataObj = {
        ...userDataObj,
        ...userData.italkCertificate.data.attributes,
      };

      dispatch(addEditITalkCertificateUser(userDataObj));
      dispatch(setCertificateSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditiTalkCertificateUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleiTalkAddCertificateSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(addEditITalkCertificateUser({}));
    dispatch(setCertificateSlider(true));
  };

  const updateiTalkCertificateId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("iTalkCertificateUserId", id);
    navigate(`/certification/italk`);
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
  } = useQuery(GET_ITALK_CERTIFICATE_LIST, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const iTalkCertificateUserList = userList.italkCertificates.data;

    if (iTalkCertificateUserList.length) {
      CommonFunctions.setItemInLocalStorage(
        "iTalkCertificateUserId",
        iTalkCertificateUserList[0].id
      );
      pageCount = userList.italkCertificates.meta.pagination.pageCount;
      currentPage = userList.italkCertificates.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      iTalkCertificateUserList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          first_name: item.attributes.first_name,
          // designation: item.attributes.designation,
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
      onClickUser={updateiTalkCertificateId}
      handleEditTemplate={handleEditiTalkCertificateUser}
      handleAddSlider={handleiTalkAddCertificateSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default ITalkCertificateDashboard;
