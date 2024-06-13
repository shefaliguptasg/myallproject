import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OnBoardingDashBoard from "./OnBoardingDashboard";
import styles from "./dashboard.module.scss";
import { Grid } from "@mui/material";
import {
  Button,
  Checkbox,
  ToggleBtnGroup,
  Tooltip,
} from "intelli-ui-components-library";
import WelcomeMailerDashBoard from "./WelcomeMailerDaashboard";
import { setApprovalStatus } from "redux-store/actions/obAction";
import CommonFunctions from "utils/commonFunction";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ITalkDashboard from "./ITalkDashboard";
import TndDashboard from "./TndDashboard";
import IBuddyDashboard from "./IBuddyDashboard";
import ITalkCertificateDashboard from "./ITalkCertificateDashboard";
import ILeapDashboard from "./ILeapDashboard";
import LearningCertificateDashboard from "./LearningCertificateDashboard";
import LearningLeagueDashboard from "./LearningLeagueDashboard";
import TeaserDashboard from "./TeaserDashboard";
import WallOfFameDashboard from "./WallOfFameDashboard";

const DashboardPage = () => {
  const userRole = CommonFunctions.getLoggedUserRole();
  const userName = CommonFunctions.getLoggedUserName();
  const updatedStatus = useSelector((state: any) => state.obId.approvalStatus);

  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState<any>(() => {
    return userRole === "t&d" ? "tab4" : "tab1";
  });
  const { hrApproval, marketingApproval } = updatedStatus;
  const handleBoxChange = (e: any, filedName: string) => {
    const boxObj = { ...updatedStatus };
    boxObj[filedName] = e?.target?.checked;
    dispatch(setApprovalStatus(boxObj));
  };

  const clickHandle = (e: any, val: string) => {
    setSelectedTab(val);
  };

  const handleClearStatus = () => {
    dispatch(setApprovalStatus({}));
  };

  const iconVariable = userName ? userName.substring(0, 1).toUpperCase() : "#";

  const GetTabs = () => {
    return userRole === "t&d" ? (
      <ToggleBtnGroup
        onToggle={clickHandle}
        selectedTab={selectedTab}
        shouldSelectByDefault={true}
        borderBottom={true}
        disabled
        className={styles["toggle-holder"]}
        styleObj={{ bgColor: "#e12625", color: "#e12625" }}
      >
        {/* <ToggleBtnGroup.Btn value="tab3">iBuddy</ToggleBtnGroup.Btn> */}
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab4">
          Appreciation
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab5">
          iTalk
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab6">
          iTalk Certificate
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab7">
          Learning Certificate
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab8">
          Learning League
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab9">
          iLeap
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab10">
          Wall Of Fame
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab11">
          Teaser
        </ToggleBtnGroup.Btn>
      </ToggleBtnGroup>
    ) : (
      <ToggleBtnGroup
        onToggle={clickHandle}
        className={styles["toggle-holder"]}
        selectedTab={selectedTab}
        shouldSelectByDefault={true}
        borderBottom={true}
        disabled
        styleObj={{ bgColor: "#e12625", color: "#e12625" }}
        // styleObj={{ bgColor: "#e12625", color: "#000000" }}
      >
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab1">
          Onboarding
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab2">
          iBuddy
        </ToggleBtnGroup.Btn>
        <ToggleBtnGroup.Btn className={styles["btn-toggle-grp"]} value="tab3">
          Welcome Mailer
        </ToggleBtnGroup.Btn>
      </ToggleBtnGroup>
    );
  };

  const tabElement = () => {
    switch (selectedTab) {
      case "tab1":
        return <OnBoardingDashBoard checkBoxObj={updatedStatus} />;
      case "tab2":
        return <IBuddyDashboard />;
      case "tab3":
        return <WelcomeMailerDashBoard />;
      case "tab4":
        return <TndDashboard checkBoxObj={updatedStatus} />;
      case "tab5":
        return <ITalkDashboard />;
      case "tab6":
        return <ITalkCertificateDashboard />;
      case "tab7":
        return <LearningCertificateDashboard />;
      case "tab8":
        return <LearningLeagueDashboard />;
      case "tab10":
        return <WallOfFameDashboard />;
      case "tab9":
        return <ILeapDashboard />;
      case "tab11":
        return <TeaserDashboard />;
      default:
        return <OnBoardingDashBoard checkBoxObj={updatedStatus} />;
    }
  };

  return (
    <div className={styles["dashboard-holder"]}>
      <div></div>
      <Grid className={`${styles["dashboard-grid"]} pd-10`}>
        {userRole == "hr" && (
          <>
            <div className={`mgt-10 ${styles["filter-block"]}`}>
              <div className="font-18 fs-b mgt-10 text-underline">
                <FilterAltIcon style={{ color: "#fff" }} fontSize="large" />
              </div>
              <div className="filter-holder">
                <Checkbox
                  checked={hrApproval || false}
                  color="error"
                  value="HR Approval"
                  onChange={(e) => handleBoxChange(e, "hrApproval")}
                />
                <Checkbox
                  checked={marketingApproval || false}
                  color="error"
                  value="Marketing Approval"
                  onChange={(e) => handleBoxChange(e, "marketingApproval")}
                />
              </div>
              <Button
                raised
                onClick={handleClearStatus}
                round="round"
                size="md"
                style={{ backgroundColor: "#e12625" }}
                className="mgl-10"
              >
                <div className={styles["btn-icon-holder"]}>
                  <RestartAltIcon />
                  <span>Reset Filter</span>
                </div>
              </Button>
              <Tooltip position="right" message={userName}>
                <div className={styles["profile-name"]}>{iconVariable}</div>
              </Tooltip>
            </div>
          </>
        )}
        <>
          <GetTabs />
        </>

        {tabElement()}
      </Grid>
    </div>
  );
};

export default DashboardPage;
