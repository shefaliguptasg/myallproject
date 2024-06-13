import React, { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import CommonFunctions from "utils/commonFunction";
import { getFontUrl } from "utils/generalUtils";
import { GET_TEASER_DATA_LIST } from "graphQL/teaser-data/getTeaserDataList";
import { GET_TEASER_DATA_BY_ID } from "graphQL/teaser-data/getTeaserData";
import {
  setAddEditTeaserData,
  setTeaserSlider,
} from "redux-store/actions/teaserAction";

const TeaserDashboard = () => {
  const showSlider = useSelector((state: any) => state.strapi.showTndSlider);
  const dispatch = useDispatch();
  const [teaserId, setTeaserId] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const headerDataList: any = [];
  let loggedUserData: any =
    CommonFunctions.getItemFromLocalStorage("teaserInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }
  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  useEffect(() => {
    userDataRefetch();
  }, [teaserId]);

  const {
    data: teaserData,
    loading: userDataLoading,
    error: userDataError,
    refetch: userDataRefetch,
  } = useQuery(GET_TEASER_DATA_BY_ID, {
    variables: { teaserId },
  });

  useEffect(() => {
    if (teaserData && teaserData.intelliTeaser.data) {
      const teaserDatabyId = teaserData.intelliTeaser.data;
      let backgroundImgUrl: string | undefined = "";
      let headerLogoImagerURl: string | undefined = "";
      let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      if (
        teaserDatabyId.attributes &&
        teaserDatabyId.attributes.background_image?.data
      ) {
        backgroundImgUrl = getFontUrl(
          strapiBaseUrl,
          teaserDatabyId.attributes.background_image.data.attributes
        );
      }
      if (
        teaserDatabyId.attributes &&
        teaserDatabyId.attributes.header_logo?.data
      ) {
        headerLogoImagerURl = getFontUrl(
          strapiBaseUrl,
          teaserDatabyId.attributes.header_logo.data.attributes
        );
      }
      let teaseDataObj = {
        id: teaserDatabyId.id,
        backgroundImgUrl,
        headeLogoImageUrl: headerLogoImagerURl,
        header_text: teaserDatabyId.attributes.header_text,
        salutation: teaserDatabyId.attributes.salutation,
        signature: teaserDatabyId.attributes.signature,
        section: teaserDatabyId.attributes.section,
      };
      const addEditTeaserData = {
        isEdit: true,
        addEditTeaserInfo: teaseDataObj,
      };
      dispatch(setAddEditTeaserData(addEditTeaserData));
      dispatch(setTeaserSlider(true));
      setTeaserId(null);
    }
  }, [teaserData]);

  const handleEditTeaser = (e: any, teaserId: number) => {
    e.stopPropagation();
    setTeaserId(teaserId);
  };

  const handleTeaserSlider = (e: any, teaserId: number) => {
    e.stopPropagation();
    dispatch(setTeaserSlider(true));
    dispatch(setAddEditTeaserData({}));
  };

  const updateTeaserId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("teaserId", id);
    navigate(`/teaser`);
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
  } = useQuery(GET_TEASER_DATA_LIST, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;
  if (userList) {
    const teaserDataList = userList.intelliTeasers.data;
    if (teaserDataList.length) {
      pageCount = userList.intelliTeasers.meta.pagination.pageCount;
      currentPage = userList.intelliTeasers.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      teaserDataList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
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
      onClickUser={updateTeaserId}
      handleEditTemplate={handleEditTeaser}
      handleAddSlider={handleTeaserSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default TeaserDashboard;
