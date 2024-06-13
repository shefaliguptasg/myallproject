import React from "react";
import { connect } from "react-redux";
import { Snackbar } from "intelli-ui-components-library";
import { Backdrop } from "@mui/material";
import styles from "./snackBar.module.scss";

import SnackBarModel, { SnackBarConfig } from "models/snackBarModel";
import { manuallyHideSnackBar } from "utils/snackBarUtils";

export interface IProps {
  snackBarConfig: SnackBarConfig | undefined;
}

const SnackBar: React.FC<IProps> = ({ snackBarConfig }) => {
  const handleClose = () => {
    manuallyHideSnackBar();
  };

  if (snackBarConfig && snackBarConfig.openSnackBar)
    return (
      <Backdrop
        open={snackBarConfig.openSnackBar}
        className={styles["back-drop"]}
        aria-hidden="false"
      >
        <Snackbar
          bgColor={snackBarConfig.type}
          message={snackBarConfig.message ? snackBarConfig.message : undefined}
          onCloseClick={handleClose}
          isVisible={true}
          height="30px"
          round="round"
          autoHide={true}
          position="bottom"
        />
      </Backdrop>
    );
  else return null;
};

const mapStateToProps = (state: any) => {
  let snackBarConfig = SnackBarModel.getInstance("", state)?.props;
  return {
    snackBarConfig,
  };
};

export default connect(mapStateToProps)(SnackBar);
