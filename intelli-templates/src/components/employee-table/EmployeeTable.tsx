import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./employeeTable.module.scss";
import Pagination from "components/pagination/Pagination";
import CommonFunctions from "utils/commonFunction";
import moment from "moment";
import { ReactComponent as EditIcon } from "../../assets/images/edit_icon_svg.svg";
import { NoRecord } from "intelli-ui-components-library";
import noRecord from "../../assets/images/no data.png";
export interface IProps {
  userData: any;
  pageNum: number;
  onClickUser: (e: string) => void;
  handleEditTemplate: (e: any, id: number) => void;
  handleAddSlider: (e: any, id: number) => void;
  pageCount: number;
  currentPage: number;
  setPageNum: (e: number) => void;
}

const EmployeeTable: React.FC<IProps> = ({
  userData,
  pageNum,
  onClickUser,
  handleEditTemplate,
  handleAddSlider,
  pageCount,
  currentPage,
  setPageNum,
}) => {
  const defaultSNo = 1 + 10 * (currentPage - 1);
  const userRole = CommonFunctions.getLoggedUserRole();
  const newDateFormate = (date: string) => {
    const dateObj = new Date(date);
    const momentObj = moment(dateObj);
    return momentObj.format("DD-MM-YYYY");
  };

  return (
    <div style={{ background: "#fff" }}>
      {userData.length ? (
        <>
          <Table className={styles["table-container"]}>
            <TableHead>
              <TableRow>
                <TableCell className={styles["table-head"]}>S.No</TableCell>
                <TableCell className={styles["table-head"]}>
                  Employee Name
                </TableCell>
                <TableCell className={styles["table-head"]}>
                  Employee Designation
                </TableCell>
                {userRole == "t&d" ? (
                  <TableCell className={styles["table-head"]}>
                    Created Date
                  </TableCell>
                ) : (
                  <>
                    <TableCell className={styles["table-head"]}>
                      HR Approval
                    </TableCell>
                    <TableCell className={styles["table-head"]}>
                      Marketing Approval
                    </TableCell>
                  </>
                )}
                <TableCell className={styles["table-head"]}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((emp: any, index: number) => {
                return (
                  <TableRow
                    key={emp.id}
                    hover
                    onClick={() => onClickUser(emp.id)}
                  >
                    <TableCell className={styles["table-cell"]}>
                      {index + defaultSNo}
                    </TableCell>
                    <TableCell className={styles["table-cell"]}>
                      {emp["first_name"]}
                    </TableCell>
                    <TableCell className={styles["table-cell"]}>
                      {emp["designation"] || "NA"}
                    </TableCell>
                    {userRole == "t&d" ? (
                      <TableCell className={styles["table-cell"]}>
                        <span className={styles["approved-status"]}>
                          {newDateFormate(emp.createdAt)}
                        </span>
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className={styles["table-cell"]}>
                          {emp["hr_approval"] ? (
                            <span className={styles["approved-status"]}>
                              Approved
                            </span>
                          ) : (
                            <span className={styles["pending-status"]}>
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell className={styles["table-cell"]}>
                          {emp["marketing_approval"] ? (
                            <span className={styles["approved-status"]}>
                              Approved
                            </span>
                          ) : (
                            <span className={styles["pending-status"]}>
                              Pending
                            </span>
                          )}
                        </TableCell>
                      </>
                    )}
                    <TableCell className={styles["table-cell"]}>
                      <div
                        onClick={(e) => {
                          emp["hr_approval"] && emp["marketing_approval"]
                            ? null
                            : handleEditTemplate &&
                              handleEditTemplate(e, emp.id);
                        }}
                      >
                        <span
                          style={{ margin: "1px 5px 0 0" }}
                          className={styles["edit-holder"]}
                        >
                          {emp["hr_approval"] && emp["marketing_approval"] ? (
                            <VisibilityIcon />
                          ) : (
                            <EditIcon />
                          )}
                        </span>
                        {/* <span style={{ fontWeight: "600" }}>
                        {emp["hr_approval"] && emp["marketing_approval"]
                          ? "View"
                          : "Edit"}
                      </span> */}
                      </div>
                    </TableCell>
                    {index == 0 && userRole != "marketing" && (
                      <div
                        onClick={(e) => {
                          handleAddSlider && handleAddSlider(e, emp.id);
                        }}
                      >
                        <button className={styles["icon-button"]}>
                          {" "}
                          <div className={styles["tooltip"]}>
                            +
                            <span className={styles["tooltiptext"]}>
                              Add New
                            </span>
                          </div>
                        </button>
                      </div>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Pagination
            className="pagination-bar"
            currentPage={pageNum}
            pageCount={pageCount}
            onPageChange={(page: any) => setPageNum(page)}
            pageNumber={currentPage}
          ></Pagination>
        </>
      ) : (
        <NoRecord className={styles["table-container"]}>
          <NoRecord.Image imgSrc={noRecord}></NoRecord.Image>
          <NoRecord.Title className={styles["norecord-title"]}>
            No items available in table.
          </NoRecord.Title>
          <a
            className={styles["noRecord-link"]}
            onClick={(e) => {
              handleAddSlider && handleAddSlider(e, 1);
            }}
          >
            Add New Item
          </a>
        </NoRecord>
      )}
    </div>
  );
};

export default EmployeeTable;
