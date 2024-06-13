import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
import { Grid } from "@mui/material";
import MenuList from "../../components/side-bar/Sidebar";
import { useSelector } from "react-redux";
import SnackBar from "components/snack-bar/SnackBar";
import SplashLoader from "components/splash-loader/SplashLoader";
import styles from "./layout.module.scss";
import AddEditObForm from "components/add-edit-form/AddEditObForm";

import AddEditIBuddyForm from "../../components/add-edit-ibuddy-form/AddEditIBuddyForm";
import AddEditTndForm from "../../components/add-edit-tnd-form/AddEditTndForm";
import AddEditItalkForm from "../../components/add-edit-italk-form/AddEditItalkForm";
import EmailForm from "../../components/send-email-form/EmailForm";
import AddEditCertificateForm from "../../components/add-edit-certificate-form/AddEditCertificateForm";
import AddEditELearningForm from "../../components/add-edit-elearning-form/AddEditELearningForm";
import AddEditLearningLeagueForm from "../../components/add-edit-learning-form/AddEditLearningFrom";

import AddEditTeaserForm from "../../components/add-edit-teaser-form/AddEditTeaserForm";
import AddEditILeapForm from "../../components/add-edit-iLeap-form/AddEditILeapForm";
import AddEditWallOfFameForm from "../../components/add-edit-wall-of-fame-form/AddEditWallOfFameForm";

interface IProps {
  clientName: string;
}

const Layout: React.FC<IProps> = (props) => {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  const showSlider = useSelector((state: any) => state.strapi.showSlider);
  const showWallOfFameSlider = useSelector(
    (state: any) => state.strapi.showWallOfFameSlider
  );
  const showLearningSlider = useSelector(
    (state: any) => state.strapi.showLearningSlider
  );
  const showIBuddySlider = useSelector(
    (state: any) => state.strapi.showIBuddySlider
  );
  const showItalkCertificateSlider = useSelector(
    (state: any) => state.strapi.showItalkCertificateSlider
  );
  const showLearningCertificateSlider = useSelector(
    (state: any) => state.strapi.showLearningCertificateSlider
  );
  //***  iLeap ***/
  const showILeapSlider = useSelector(
    (state: any) => state.strapi.showILeapSlider
  );

  const showTndSlider = useSelector((state: any) => state.strapi.showTndSlider);
  const showTeaserSlider = useSelector(
    (state: any) => state.strapi.showTeaserSlider
  );
  const emailOpen = useSelector((state: any) => state.sendEmail.open);
  const showItalkSlider = useSelector(
    (state: any) => state.strapi.showItalkSlider
  );

  const showLoader: any = useSelector((state: any) => state.strapi.loader);
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <div
        className={`${styles["wrapper"]} ${
          location.pathname == "/login" ||
          location.pathname == "/register" ||
          location.pathname == "/forgetpassword"
            ? styles["show-background"]
            : ""
        } `}
      >
        <div className="main-container">
          <Grid container direction="row">
            {location.pathname == "/login" ||
            location.pathname == "/register" ||
            location.pathname == "/forgetpassword" ? null : (
              <MenuList />
            )}
            <Grid
              className={`${
                location.pathname == "/login" ||
                location.pathname == "/register" ||
                location.pathname == "/forgetpassword"
                  ? null
                  : styles["main-page"]
              }`}
              xs={12}
            >
              <div
                className={`${
                  location.pathname == "/login" ||
                  location.pathname == "/register" ||
                  location.pathname == "/forgetpassword"
                    ? null
                    : styles["canvas-wrap"]
                }`}
              >
                <AppRoutes></AppRoutes>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
      {showItalkSlider ? <AddEditItalkForm /> : null}
      {showSlider ? <AddEditObForm /> : null}
      {showIBuddySlider ? <AddEditIBuddyForm /> : null}
      {showTndSlider ? <AddEditTndForm /> : null}
      {showILeapSlider ? <AddEditILeapForm /> : null}
      {showTeaserSlider ? <AddEditTeaserForm></AddEditTeaserForm> : null}

      {emailOpen && <EmailForm />}
      {showItalkCertificateSlider && <AddEditCertificateForm />}
      {showLearningCertificateSlider && <AddEditELearningForm />}
      {showLearningSlider ? <AddEditLearningLeagueForm /> : null}
      {showWallOfFameSlider ? <AddEditWallOfFameForm /> : null}
      {showLoader && <SplashLoader loader="danger" backdrop />}
      <SnackBar />
    </>
  );
};

export default Layout;
