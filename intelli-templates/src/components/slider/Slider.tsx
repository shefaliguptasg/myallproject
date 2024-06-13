import { Button } from "intelli-ui-components-library";
import React, { ReactNode, useEffect } from "react";
import styles from "./slider.module.scss";
import SliderFooter, { footerProps } from "./slider-footer/SliderFooter";
import SliderHeader, { headerProps } from "./slider-header/SliderHeader";
import { useSelector } from "react-redux";

type sliderProps = {
  headerProps: headerProps;
  footerProps: footerProps;
  children: ReactNode;
};

const Slider = ({ headerProps, footerProps, children }: sliderProps) => {
  useEffect(() => {
    const body: any = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div className={styles["slider-wrapper"]}>
        <div className={styles["slider-holder"]}>
          <div className={styles["slider-comp"]}>
            <SliderHeader {...headerProps} />
            <div className={`${styles["slider-content"]}`}>{children}</div>
            <SliderFooter {...footerProps} />
          </div>
        </div>
      </div>
      <div className={styles["slider-overlay"]}></div>
    </>
  );
};

export default Slider;
