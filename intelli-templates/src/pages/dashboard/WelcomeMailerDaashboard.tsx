import React, { useState } from "react";
import EmployeeTable from "../../components/employee-table/EmployeeTable";
import { useNavigate } from "react-router-dom";
import CommonFunctions from "utils/commonFunction";
import { useQuery } from "@apollo/client";
import { GET_MAILER_LIST_DATA } from "graphQL/welcome-mailer/welcomeMailerList";

const WelcomeMailerDashBoard = () => {
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();

  const clientName = "onboarding_opt_1";
  const headerDataList: any = [];
  let pageCount = 0;
  let currentPage = 1;
  let defaultSNo = 1;

  const handleEditObUser = (userId: string) => {
    console.log("id");
  };

  const updateObId = (id: string) => {
    CommonFunctions.setItemInLocalStorage("mailerUserId", id);
    navigate(`/welcomemailer/template1`);
  };
  //getting welcomeMailer Data
  const { loading, error, data } = useQuery(GET_MAILER_LIST_DATA, {
    variables: { clientName, pageNum },
  });
  if (loading) return <></>;
  if (data) {
    const userData = data.welcomeMailers.data;
    CommonFunctions.setItemInLocalStorage("mailerUserId", userData[0].id);
    pageCount = data.welcomeMailers.meta.pagination.pageCount;
    currentPage = data.welcomeMailers.meta.pagination.page;
    defaultSNo = 1 + 10 * (currentPage - 1);
    userData.forEach((item: any) => {
      headerDataList.push({
        id: item.id,
        header_emp_name: item.attributes.welcome_mailer_data.emp_name,
        header_emp_designation:
          item.attributes.welcome_mailer_data.emp_designation,
      });
    });
  }
  return (
    <EmployeeTable
      userData={headerDataList}
      pageCount={pageCount}
      currentPage={currentPage}
      onClickUser={updateObId}
      handleEditTemplate={handleEditObUser}
      handleAddSlider={handleEditObUser}
      setPageNum={setPageNum}
      pageNum={pageNum}
    />
  );
};

export default WelcomeMailerDashBoard;
