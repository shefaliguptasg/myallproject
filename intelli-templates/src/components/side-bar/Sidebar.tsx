import React, { useState, useEffect, Component } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Button } from "intelli-ui-components-library";
import { ReactComponent as HomeIcon } from "../../assets/images/HomeIcon.svg";
import { ReactComponent as AppreciationIcon } from "../../assets/images/AppreciationIcon.svg";
import { ReactComponent as ItalkIcon } from "../../assets/images/ItalkIcon.svg";
import { ReactComponent as LearningIcon } from "../../assets/images/LearningIcon.svg";
import { ReactComponent as IleapIcon } from "../../assets/images/iLeap.svg";
import { ReactComponent as WallOfFameIcon } from "../../assets/images/wall_of_fame.svg";
import { ReactComponent as OnboardingIcon } from "../../assets/images/onboarding.svg";
import { ReactComponent as IBuddy } from "../../assets/images/iBuddy.svg";
import { ReactComponent as ArrowIcon } from "../../assets/images/Arrow-Icon.svg";
import { ReactComponent as CertificationIcon } from "../../assets/images/CertificationIcon.svg";
import { ReactComponent as LogoutIcon } from "../../assets/images/logout.svg";
import { ReactComponent as TeaserIcon } from "../../assets/images/Teaser-Icon.svg";
import { sidebarMenu } from "utils/config";
import { Grid } from "@mui/material";
import styles from "./sidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CommonFunctions from "utils/commonFunction";

interface IProps {
  clientName: string;
}

type TMenuObj = {
  parentIndex: number | null;
  childIndex: number | null;
};

const Sidebar = (props: any) => {
  const userRole = CommonFunctions.getLoggedUserRole();
  const location = useLocation();
  useEffect(() => {
    let childIndex = null,
      parentIndex = null;
    let path: string | string[] = location.pathname;
    if (path === "/") {
      path = ["", "home"];
    } else {
      path = path.split("/");
    }

    let parentData = sidebarMenu.filter((cur) => cur.id === path[1]);
    parentIndex = sidebarMenu.findIndex((cur) => cur.id === path[1]);

    if (parentData.length && parentData[0].isChild) {
      childIndex = parentData[0].subMenu?.findIndex(
        (cur) => cur.id === path[2]
      );
    }
    setMenuObj({ parentIndex: parentIndex, childIndex: childIndex });
  }, [location.pathname]);

  const [menuObj, setMenuObj] = useState<TMenuObj>({
    parentIndex: null,
    childIndex: null,
  });

  const handleActive = (
    parentIndex: number | null,
    childIndex: number | null
  ) => {
    const dataObj = { ...menuObj };
    if (childIndex || childIndex === 0) {
      dataObj["childIndex"] = childIndex;
    } else {
      if (dataObj.parentIndex === parentIndex) {
        dataObj["parentIndex"] = null;
      } else {
        dataObj["parentIndex"] = parentIndex;
        dataObj["childIndex"] = null;
      }
    }
    setMenuObj({ ...dataObj });
  };

  const iconComponents = {
    HomeIcon: HomeIcon,
    AppreciationIcon: AppreciationIcon,
    ItalkIcon: ItalkIcon,
    CertificationIcon: CertificationIcon,
    IleapIcon: IleapIcon,
    LearningIcon: LearningIcon,
    WallOfFameIcon: WallOfFameIcon,
    OnboardingIcon: OnboardingIcon,
    TeaserIcon: TeaserIcon,
    IBuddy: IBuddy,
  };

  return (
    <div className={styles["list-container"]}>
      {sidebarMenu.map((cur, index) => {
        const IconComponent = iconComponents[cur.icon!];
        return cur.isValid.includes(userRole) ? (
          <>
            <Link to={cur.path}>
              <div
                className={`${styles["list-holder"]} ${
                  menuObj.parentIndex === index && !cur.isChild
                    ? styles["active"]
                    : null
                } `}
                key={index}
                onClick={() => handleActive(index, null)}
              >
                <div className={`${styles["list-main"]} font-16 `}>
                  <span className={styles["icon-holder"]}>
                    <span className="mgr-10" key={index}>
                      {IconComponent && <IconComponent />}
                    </span>
                    <span>{cur.title}</span>
                  </span>

                  {cur.isChild && (
                    <div className={styles["list-arrow"]}>
                      {menuObj.parentIndex === index ? (
                        <ArrowIcon />
                      ) : (
                        <ArrowIcon />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
            {menuObj.parentIndex === index && cur.isChild
              ? cur.subMenu.map((cur, i) => {
                  return (
                    <Link key={i} to={cur.path}>
                      <div
                        className={`${styles["list-sub-menu"]} ${
                          menuObj.childIndex === i ? styles["active"] : null
                        }`}
                        key={i}
                        onClick={() => handleActive(index, i)}
                      >
                        <div className={`${styles["list-main"]} font-16 fs-b`}>
                          {cur.title}
                        </div>
                      </div>
                    </Link>
                  );
                })
              : null}
          </>
        ) : null;
      })}
    </div>
  );
};

const MenuList = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const imgUrl = `${process.env.REACT_APP_STRAPI_BASE_URL}/uploads/Intelliswift_Logo_ccbd59b2d2.svg`;
  const userId = localStorage.getItem("obdUserId");
  const obData = useSelector((state: any) => state.obId.obData);
  const { welcomeMailers } = useSelector((state: any) => state.strapi);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <>
      <Grid className={styles["side-bar-holder"]} xs={2}>
        <div className={styles["menu-logo"]}>
          <Link to="/">
            <img src={imgUrl}></img>
          </Link>
        </div>
        <div className={styles["fixed-menu"]}>
          <Sidebar />
          <div className={styles["logout-btn"]}>
            <div className={styles["logout-button"]} onClick={handleLogout}>
              <span className={styles["logout-icon"]}>
                <LogoutIcon />
              </span>
              <span className={styles["logout-text"]}>Logout</span>
            </div>
          </div>
          {location.pathname.includes("onbording") ? (
            <div>
              <div className="check-holder mgb-10"></div>
            </div>
          ) : null}
        </div>
      </Grid>
    </>
  );
};

export default MenuList;
