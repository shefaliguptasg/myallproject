import React from "react";
import { NoRecord } from "intelli-ui-components-library";
import style from "./noRecord.module.scss";
import ErrorPage404 from "../../assets/images/404-Page-not-found.svg";

type NoRecordPageProps = {
  tittle: string;
  subTitle: string;
  clickHandler: () => void;
};

function NoRecordPage({ tittle, subTitle, clickHandler }: NoRecordPageProps) {
  return (
    <>
      <NoRecord className={`${style["maindiv"]}`}>
        <NoRecord.Title>{tittle}</NoRecord.Title>
        <NoRecord.SubTitle>{subTitle}</NoRecord.SubTitle>
        <NoRecord.Image
          imgSrc={ErrorPage404}
          className={style.image}
        ></NoRecord.Image>
        <NoRecord.Button
          buttonProps={{
            color: "info",
            size: "lg",
            style: { backgroundColor: "#e12625" },
          }}
          onClick={clickHandler}
        >
          Back To Home
        </NoRecord.Button>
      </NoRecord>
    </>
  );
}

export default NoRecordPage;
