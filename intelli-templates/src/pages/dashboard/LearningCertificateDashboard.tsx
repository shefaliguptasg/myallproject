import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommonFunctions from "utils/commonFunction";
import { setLearningCertificateSlider } from "redux-store/actions/strapiActions";
import { GET_LEARNING_CERTIFICATE_BY_ID } from "graphQL/learning-certificate/getLearningCertificateById";
import { GET_LEARNING_CERTIFICATE_LIST } from "graphQL/learning-certificate/getLearningCertificateList";
import { addEditLearningCertificateUser } from "redux-store/actions/learningCertificate";

const LearningCertificateDashboard = () => {
  const showSlider = useSelector(
    (state: any) => state.strapi.showLearningCertificateSlider
  );
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
  } = useQuery(GET_LEARNING_CERTIFICATE_BY_ID, {
    variables: { userId: userId },
  });

  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.learningCertificate.data) {
      let userDataObj = {};
      userDataObj["id"] = userData.learningCertificate.data.id;
      userDataObj = {
        ...userDataObj,
        ...userData.learningCertificate.data.attributes,
      };

      dispatch(addEditLearningCertificateUser(userDataObj));
      dispatch(setLearningCertificateSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditLearningCertificateUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleLearningCertificateSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(addEditLearningCertificateUser({}));
    dispatch(setLearningCertificateSlider(true));
  };
  const updateLearningCertificateId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("LearningCertificateUserId", id);
    navigate(`/certification/learning1`);
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
  } = useQuery(GET_LEARNING_CERTIFICATE_LIST, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const learningCertificateUserList = userList.learningCertificates.data;

    if (learningCertificateUserList.length) {
      CommonFunctions.setItemInLocalStorage(
        "LearningCertificateUserId",
        learningCertificateUserList[0].id
      );
      pageCount = userList.learningCertificates.meta.pagination.pageCount;
      currentPage = userList.learningCertificates.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      learningCertificateUserList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          first_name: item.attributes.first_name,
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
      onClickUser={updateLearningCertificateId}
      handleEditTemplate={handleEditLearningCertificateUser}
      handleAddSlider={handleLearningCertificateSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default LearningCertificateDashboard;
