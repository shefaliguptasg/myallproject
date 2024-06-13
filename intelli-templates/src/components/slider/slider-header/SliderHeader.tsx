import React, { ReactNode } from "react";
// import styles from "./slider-header.module.scss";
import styles from "../slider.module.scss";

type iconProps = {
  icon: ReactNode;
  className?: string;
  onClick: () => void;
  width?: number;
};
export type headerProps = {
  heading: string;
  // variant: 'secondary',
  className?: string;
  leftIcons: iconProps;
  rightIcons: iconProps;
};

const SliderHeader = ({ leftIcons, heading, rightIcons }: headerProps) => {
  const iconHolderWidth = 43;
  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-holder"]}>
        <IconHolder {...leftIcons} width={iconHolderWidth} />
        <div className={styles["header-text-holder"]}>
          <div className={styles["header-title"]}>{heading}</div>
        </div>
        <IconHolder {...rightIcons} />
      </div>
    </div>
  );
};

const IconHolder = (props: iconProps) => {
  return (
    <div className={styles["icon-conatiner"]} style={{ minWidth: props.width }}>
      <div className={styles["icon-holder"]} onClick={props.onClick}>
        <div className={styles["left-icon"]}>{props.icon}</div>
      </div>
    </div>
  );
};

export default SliderHeader;
