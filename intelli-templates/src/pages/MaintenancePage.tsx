import React from "react";
import { useNavigate } from "react-router-dom";
import NoRecordPage from "../components/no-record/NoRecord";

const MaintenancePage: React.FC<any> = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <>
      <NoRecordPage
        tittle="Page Not Found"
        subTitle="The page you are looking was moved, removed, renamed, or might never exist!"
        clickHandler={handleClick}
      />
    </>
  );
};

export default MaintenancePage;
