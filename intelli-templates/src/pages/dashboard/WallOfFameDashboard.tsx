import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { setWallOfFameSlider } from "redux-store/actions/strapiActions";
import CommonFunctions from "utils/commonFunction";
import { useDispatch, useSelector } from "react-redux";
import { GET_WALL_OF_FAME_BY_ID } from "graphQL/wall-of-fame-data/getWallOfFameById";
import { addEditWallOfFameUser } from "redux-store/actions/wallOfFameAction";
import { GET_WALL_OF_FAME_LIST } from "graphQL/wall-of-fame-data/getWallOfFameList";
import { resetWallOfFameUser } from "redux-store/actions/wallOfFameAction";

const WallOfFameDashboard = () => {
  const showSlider = useSelector(
    (state: any) => state.strapi.showWallOfFameSlider
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
  } = useQuery(GET_WALL_OF_FAME_BY_ID, {
    variables: { userId: userId },
  });

  useEffect(() => {
    userDataRefetch();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.intelliWof.data) {
      let userDataObj = {};
      userDataObj["id"] = userData.intelliWof.data.id;
      userDataObj["isEdit"] = true;
      userDataObj = {
        ...userDataObj,
        userData: userData.intelliWof.data.attributes.user_data,
        quarter_year: userData.intelliWof.data.attributes.quarter_year,
      };
      dispatch(addEditWallOfFameUser(userDataObj));
      dispatch(setWallOfFameSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const handleEditWallOfFameUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleWallOfFameSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(setWallOfFameSlider(true));
    dispatch(resetWallOfFameUser());
  };

  const updateWallOfFameId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("wallOfFameUserId", id);
    navigate(`/wall-of-fame-template`);
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
  } = useQuery(GET_WALL_OF_FAME_LIST, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;

  if (userList) {
    const fameUserList = userList.intelliWofs.data;

    if (fameUserList.length) {
      pageCount = userList.intelliWofs.meta.pagination.pageCount;
      currentPage = userList.intelliWofs.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      fameUserList.forEach((item: any) => {
        const userData = item.attributes.user_data;
        headerDataList.push({
          id: item.id,
          first_name: userData[0].first_name,
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
      onClickUser={updateWallOfFameId}
      handleEditTemplate={handleEditWallOfFameUser}
      handleAddSlider={handleWallOfFameSlider}
    />
  );
};

export default WallOfFameDashboard;
