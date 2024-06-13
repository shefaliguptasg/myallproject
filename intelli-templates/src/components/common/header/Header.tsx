import React, { FC } from "react";
import styles from "./header.module.scss";

type IProps = {
  children?: React.ReactNode;
  backgroundImgUrl?: string;
  headerText?: string;
  logoUrl?: string;
  logoAltText?: string;
  classname?: {
    headerBackgroundClass?: string;
    logoContainerClass?: string;
    logoImageClass?: string;
    verticalBarCss?: string;
  };
};

const Header: FC<IProps> = (props) => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles["header-div"]} ${props.classname?.headerBackgroundClass}`}
      >
        {props.backgroundImgUrl && (
          <img
            id="background-image"
            src={props.backgroundImgUrl}
            alt="Background"
            className={styles.background_image}
          />
        )}

        {/* Black Vertical Bar in Header */}
        <div
          className={`${styles["black-vertical-bar"]} ${props.classname?.verticalBarCss}`}
        >
          {props.logoUrl && (
            <div className={`${props.classname?.logoContainerClass}`}>
              <img
                className={props.classname?.logoImageClass}
                alt={props.logoAltText}
                src={props.logoUrl}
              />
            </div>
          )}

          {props.children}
          {props.headerText && (
            <div className={styles["header-text"]}>
              <p
                className={styles["header-pg-text"]}
              >{`${props.headerText}`}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
