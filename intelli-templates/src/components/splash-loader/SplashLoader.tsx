import React from "react";
import { Loader } from "intelli-ui-components-library";
import styles from "./splashLoader.module.scss";

interface SplashProps {
  backdrop?: boolean;
  showLogo?: boolean;
  loader?: string;
}
const SplashLoader: React.FC<SplashProps> = ({
  showLogo = false,
  loader,
  backdrop = false,
}) => {
  const imgUrl = `${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`;

  return (
    <>
      {backdrop ? <div className={styles["back-drop"]}></div> : null}
      <div className={styles["loader-holder"]}>
        <div className={styles["loader-container"]}>
          {showLogo ? (
            <div className={styles["img-holder"]}>
              <img src={imgUrl} className={styles["img-comp"]} alt="logo" />
            </div>
          ) : null}
          <Loader width="9rem" variants={loader} />
        </div>
      </div>
    </>
  );
};

export default SplashLoader;
