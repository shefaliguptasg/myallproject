import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, DropDown } from "intelli-ui-components-library";
import { Checkbox, FormControlLabel } from "@mui/material";
import styles from "./download.module.scss";
import SendIcon from "@mui/icons-material/Send";
import GetAppIcon from "@mui/icons-material/GetApp";
import CommonFunctions from "utils/commonFunction";

const DownloadTemplate = ({
  fileFormate,
  handleImageType,
  handleDownload,
  checkBoxObj,
  handleSend,
  handleCheckboxChange,
}: any) => {
  const location = useLocation();
  const { hrApproval, marketingApproval } = checkBoxObj;
  let loggedUserData: any = CommonFunctions.getItemFromLocalStorage("userInfo");
  if (loggedUserData) {
    loggedUserData = JSON.parse(loggedUserData);
  }
  const isHr = loggedUserData.role == "hr" ? true : false;
  const userRole = CommonFunctions.getLoggedUserRole();

  return (
    <>
      {location.pathname.includes("welcomemailer") ? null : (
        <div className={styles["formHolder"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userRole != "t&d" ? (
              <>
                <div style={{ color: "#fff" }}>
                  <FormControlLabel
                    className={styles["label"]}
                    label="HR Approval"
                    control={
                      <Checkbox
                        checked={hrApproval}
                        disabled={!isHr ? true : false}
                        name="hr"
                        color="primary"
                        onChange={(e) => handleCheckboxChange(e, "hrApproval")}
                      />
                    }
                  />
                </div>

                <div>
                  <FormControlLabel
                    className={styles["label"]}
                    label="Marketing Approval"
                    style={{ color: "#fff" }}
                    control={
                      <Checkbox
                        checked={marketingApproval}
                        name="marketing"
                        disabled={isHr ? true : false}
                        color="primary"
                        onChange={(e) =>
                          handleCheckboxChange(e, "marketingApproval")
                        }
                      />
                    }
                  />
                </div>
              </>
            ) : null}

            {handleSend && (
              <Button
                round="round"
                raised
                style={{ backgroundColor: "#e12625", marginRight: 10 }}
                disabled={
                  (hrApproval && marketingApproval) || userRole == "t&d"
                    ? false
                    : true
                }
                onClick={handleSend}
              >
                <span style={{ fontWeight: "600" }}>Send</span>
                <span style={{ margin: "5px 0px 0px 5px" }}>
                  <SendIcon fontSize="small" />
                </span>
              </Button>
            )}
            <Button
              round="round"
              raised
              style={{ backgroundColor: "#e12625" }}
              disabled={
                (hrApproval && marketingApproval) || userRole == "t&d"
                  ? false
                  : true
              }
              onClick={handleDownload}
            >
              <span style={{ fontWeight: "600" }}>Download </span>
              <span style={{ marginTop: "5px" }}>
                <GetAppIcon />
              </span>
            </Button>
            <DropDown
              className={styles["option-list"]}
              optionList={[
                { label: "JPG", key: "jpg" },
                { label: "PNG", key: "png" },
                { label: "JPEG", key: "jpeg" },
              ]}
              placeholder="Select Image Type"
              value={fileFormate}
              onChange={(selectedOption) => {
                handleImageType(selectedOption.key);
              }}
            ></DropDown>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadTemplate;
