import React from "react";
import { Button } from "intelli-ui-components-library";
// import styles from "./slider-footer.module.scss";
import styles from "../slider.module.scss";

type btnObj = {
  children: string;
  onClick: () => void;
  size: "lg" | "md";
  className?: string;
  round: "round" | "pill";
  isLoader?: boolean;
};

export type footerProps = {
  btnProps?: btnObj[];
};

const SliderFooter = ({ btnProps }: footerProps) => {
  if (!btnProps || !btnProps.length) {
    return null;
  }
  return (
    <div className={styles["footer-container"]}>
      {btnProps.map((cur, i) => {
        return (
          <Button
            {...cur}
            key={i}
            raised
            block
            style={{ backgroundColor: "#e12625" }}
          />
        );
      })}
    </div>
  );
};

export default SliderFooter;
