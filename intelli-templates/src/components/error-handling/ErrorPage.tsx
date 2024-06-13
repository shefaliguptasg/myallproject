import React, { useEffect } from "react";

import { pushAllEventsToServer } from "services/eventService";
import { getClientName } from "utils/generalUtils";

import { useNavigate } from "react-router-dom";
import NoRecordPage from "components/no-record/NoRecord";

interface IError {
  title?: string;
}

const ErrorPage: React.FC<IError> = (props) => {
  const clientName = getClientName();

  useEffect(() => {
    pushAllEventsToServer();
  }, []);

  useEffect(() => {
    document.title = props.title || "Onboarding Template";
  }, [props.title]);

  const Navigate = useNavigate();
  const handleClick = () => {
    Navigate(`/`);
  };

  return (
    <NoRecordPage
      tittle="Something went wrong!"
      subTitle="The page you are looking was moved, removed, renamed, or might never exist!"
      clickHandler={handleClick}
    />
  );
};

export default ErrorPage;
