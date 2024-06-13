import { CSSProperties } from "react";
import SnackBarModel, { SnackBarConfig } from "../models/snackBarModel";
const autoHideDuration = 20000;

type type = "error" | "default" | "primary" | "success" | "info" | "warning";

export const showSnackBar = (message?: string, type?: type) => {
  const config: SnackBarConfig = {
    openSnackBar: true,
    role: "alert",
    message: message || null,
    type: type || "error",
  };
  new SnackBarModel({
    id: "",
    ...config,
  }).$save();
};

export const manuallyHideSnackBar = () => {
  const config: SnackBarConfig = {
    openSnackBar: false,
    role: "alert",
    message: "",
  };
  new SnackBarModel({
    id: "",
    ...config,
  }).$save();
};
