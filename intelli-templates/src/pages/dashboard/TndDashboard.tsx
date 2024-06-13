import { useQuery } from "@apollo/client";
import { GET_TND_LIST_DATA } from "graphQL/tnd-user/tndList";
import CommonFunctions from "utils/commonFunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { GET_TND_USER_BY_ID } from "graphQL/tnd-user/getTndUserId";
import { getFontUrl } from "utils/generalUtils";
import { UploadImage, setTndSlider } from "redux-store/actions/strapiActions";
import { useDispatch, useSelector } from "react-redux";
import { addEditTndUser } from "redux-store/actions/tndActions";

type tndProps = {
  checkBoxObj: Record<string, boolean>;
};

const TndDashboard = ({ checkBoxObj }: tndProps) => {
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tndUserId, setTndUserId] = useState<number | null>(null);
  const showSlider = useSelector((state: any) => state.strapi.showTndSlider);

  const headerDataList: any = [];

  let loggedUserData: any = CommonFunctions.getItemFromLocalStorage("userInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }
  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  // Edit User Form
  useEffect(() => {
    tndUserDataRefetch();
  }, [tndUserId]);

  const {
    data: tndUserData,
    loading: tndLoading,
    error: tndError,
    refetch: tndUserDataRefetch,
  } = useQuery(GET_TND_USER_BY_ID, {
    variables: { tndUserId },
  });

  useEffect(() => {
    if (tndUserData && tndUserData.intelliTnd.data) {
      let tndUserDataObj = {};
      let imgUrl: string | undefined = "";
      tndUserDataObj["id"] = tndUserData.intelliTnd.data.id;
      tndUserDataObj = {
        ...tndUserDataObj,
        ...tndUserData.intelliTnd.data.attributes,
      };
      let strapiBaseUrl = process.env.REACT_APP_STRAPI_BASE_URL || "";
      if (
        tndUserData.intelliTnd.data.attributes &&
        tndUserData.intelliTnd.data.attributes.profile?.data
      ) {
        imgUrl = getFontUrl(
          strapiBaseUrl,
          tndUserData.intelliTnd.data.attributes.profile.data.attributes
        );
      }
      dispatch(UploadImage(imgUrl));
      dispatch(addEditTndUser(tndUserDataObj));
      dispatch(setTndSlider(true));
      setTndUserId(null);
    }
  }, [tndUserData]);
  //

  const updateTndId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("tndUserId", id);
    navigate(`/appreciation`);
  };

  const handleEditTndUser = (e: any, tndUserId: number) => {
    e.stopPropagation();
    setTndUserId(tndUserId);
  };

  const handleTndAddSlider = (e: any, tndUserId: number) => {
    e.stopPropagation();
    dispatch(UploadImage(""));
    dispatch(addEditTndUser({}));
    dispatch(setTndSlider(true));
  };

  useEffect(() => {
    if (!showSlider) {
      refetch();
    }
  }, [showSlider]);

  // TND data
  const { loading, error, data, refetch } = useQuery(GET_TND_LIST_DATA, {
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
  //
  if (loading) return <></>;
  if (data) {
    const userData = data.intelliTnds.data;
    if (userData.length) {
      CommonFunctions.setItemInLocalStorage("tndUserId", userData[0].id);
      pageCount = data.intelliTnds.meta.pagination.pageCount;
      currentPage = data.intelliTnds.meta.pagination.page;
      defaultSNo = 1 + 10 * (currentPage - 1);
      userData.forEach((item: any) => {
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
      onClickUser={updateTndId}
      handleEditTemplate={handleEditTndUser}
      setPageNum={setPageNum}
      pageNum={pageNum}
      handleAddSlider={handleTndAddSlider}
    />
  );
};

export default TndDashboard;
