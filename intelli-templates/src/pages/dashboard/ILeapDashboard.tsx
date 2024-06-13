import { useEffect, useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import CommonFunctions from "utils/commonFunction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GET_ILEAP_USER_ID_DATA } from "graphQL/ileap-data/iLeapById";
import { useQuery } from "@apollo/client";
import { getFontUrl } from "utils/generalUtils";
import {
  addEditILeapUser,
  setILeapImages,
} from "redux-store/actions/iLeapAction";
import { setILeapSlider, UploadImage } from "redux-store/actions/strapiActions";
import { GET_ILEAP_LIST_DATA } from "graphQL/ileap-data/iLeapListData";

function ILeapDashboard() {
  const showSlider = useSelector((state: any) => state.strapi.showIleapSlider);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);
  const [pageNum, setPageNum] = useState(1);

  const headerDataList: any = [];
  let loggedUserData: any =
    CommonFunctions.getItemFromLocalStorage("iLeapUserInfo");

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
  } = useQuery(GET_ILEAP_USER_ID_DATA, { variables: { userId: userId } });

  useEffect(() => {
    if (!showSlider) {
      userListRefetch();
    }
  }, [showSlider]);

  useEffect(() => {
    if (userData && userData.intelliILeap.data) {
      let userDataObj = {};
      let imgUrl: string | undefined = "";
      userDataObj["id"] = userData.intelliILeap.data.id;

      userDataObj = {
        ...userDataObj,
        ...userData.intelliILeap.data.attributes,
      };

      const strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      if (
        userData.intelliILeap.data.attributes &&
        userData.intelliILeap.data.attributes.background_image?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          userData.intelliILeap.data.attributes.background_image.data.attributes
        );
      }
      dispatch(
        setILeapImages({
          imgKey: "backgroundImage",
          fileData: imgUrl,
        })
      );
      dispatch(addEditILeapUser(userDataObj));
      dispatch(setILeapSlider(true));
      setUserId(null);
    }
  }, [userData]);

  const updateiLeapId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("iLeapUserId", id);
    navigate("/ileap");
  };
  const handleEditiLeapUser = (e: any, userId: number) => {
    e.stopPropagation();
    setUserId(userId);
  };

  const handleiLeapAddSlider = (e: any, userId: number) => {
    e.stopPropagation();
    dispatch(UploadImage(""));
    dispatch(setILeapSlider(true));
    dispatch(addEditILeapUser({}));
  };

  const {
    data: userList,
    loading: userListLoading,
    error: userListError,
    refetch: userListRefetch,
  } = useQuery(GET_ILEAP_LIST_DATA, {
    variables: {
      pageNum,
    },
  });

  if (userListLoading) return <></>;
  if (userList) {
    const iLeapUserList = userList.intelliILeaps.data;
    if (iLeapUserList.length) {
      CommonFunctions.setItemInLocalStorage("iLeapUserId", iLeapUserList[0].id);
      pageCount = userList.intelliILeaps.meta.pagination.pageCount;
      currentPage = userList.intelliILeaps.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      iLeapUserList.forEach((item: any) => {
        headerDataList.push({
          id: item.id,
          ...item.attributes,
          header_text: item.attributes.header_text,
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
      onClickUser={updateiLeapId}
      handleEditTemplate={handleEditiLeapUser}
      handleAddSlider={handleiLeapAddSlider}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
}
export default ILeapDashboard;
