import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useQuery } from "@apollo/client";
import { GET_LEARNING_LIST } from "graphQL/learning-data/getLearningList";
import { GET_LEARNING_BY_ID } from "graphQL/learning-data/getLearningById";
import { useNavigate } from "react-router-dom";
import {
  addEditLearningUser,
  resetLearningUser,
} from "redux-store/actions/learningAction";
import { setLearningSlider } from "redux-store/actions/strapiActions";
import CommonFunctions from "utils/commonFunction";
import { useDispatch, useSelector } from "react-redux";

const LearningLeagueDashboard = () => {
  const showSlider = useSelector(
    (state: any) => state.strapi.showLearningSlider
  );
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();
  const headerDataList: any = [];

  const {
    data: userData,
    loading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery(GET_LEARNING_BY_ID, {
    variables: { userId: userId },
  });

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.learningLeague.data) {
      let userDataObj = {};
      userDataObj["id"] = userData.learningLeague.data.id;
      userDataObj["isEdit"] = true;
      userDataObj = {
        ...userDataObj,
        userData: userData.learningLeague.data.attributes.user_data,
        sectionData: userData.learningLeague.data.attributes.section_data,
      };
      dispatch(addEditLearningUser(userDataObj));
      dispatch(setLearningSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditLearningLeagueUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleLearningLeagueAddSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(setLearningSlider(true));
    dispatch(resetLearningUser());
  };

  const updateLearningLeagueId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("learningLeagueUserId", id);
    navigate(`/learning-league-template`);
  };

  useEffect(() => {
    if (!showSlider) {
      userListRefetch();
    }
  }, [showSlider]);

  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  const {
    data: userList,
    loading: userListLoading,
    error: userListError,
    refetch: userListRefetch,
  } = useQuery(GET_LEARNING_LIST, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const learningUserList = userList.learningLeagues.data;

    if (learningUserList.length) {
      pageCount = userList.learningLeagues.meta.pagination.pageCount;
      currentPage = userList.learningLeagues.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      learningUserList.forEach((item: any) => {
        const userData = item.attributes.user_data;
        headerDataList.push({
          id: item.id,
          first_name: userData[0].emp_name,
          createdAt: item.attributes.createdAt,
        });
      });
    }
  }

  return (
    <EmployeeTable
      userData={headerDataList}
      pageNum={pageNum}
      pageCount={pageCount}
      currentPage={currentPage}
      setPageNum={setPageNum}
      onClickUser={updateLearningLeagueId}
      handleEditTemplate={handleEditLearningLeagueUser}
      handleAddSlider={handleLearningLeagueAddSlider}
    />
  );
};

export default LearningLeagueDashboard;
