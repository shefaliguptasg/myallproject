import { CSSProperties } from "react";
import { BaseModel } from "../redux-store/index";

export interface SnackBarConfig {
  message: string | null;
  openSnackBar: boolean;
  role: "alert";
  type?: "error" | "default" | "primary" | "success" | "info" | "warning";
}

export default class SnackBarModel extends BaseModel<SnackBarConfig> {
  static resource = "SnackBarModel";
}
