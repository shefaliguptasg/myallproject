import React from "react";
import styles from "./teaserTemplate.module.scss";
import logo from "../../assets/images/italk-logo.svg";
import { useSelector } from "react-redux";

const ITeaserContent = () => {
  const teaserData = useSelector((state: any) => state.teaserInfo.teaserData);
  return (
    <div>
      <div className={styles["main-content"]}>
        <p className={"pdb-15"}>{teaserData.salutation},</p>
        {teaserData.section.map((sec: string, index: number) => {
          return (
            <div key={index} className={styles["paragraph-gap"]}>
              <p
                dangerouslySetInnerHTML={{
                  __html: sec,
                }}
              ></p>
            </div>
          );
        })}
        <div className={styles["paragraph-gap"]}>
          <p>{teaserData.signature},</p>
          <p>Talent Development</p>
        </div>
      </div>
    </div>
  );
};

export default ITeaserContent;
