import SplashLoader from "components/splash-loader/SplashLoader";
import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routesData } from "./routes";
import CommonFunctions from "utils/commonFunction";
import { userInfo } from "os";

const AppRoutes: React.FC<any> = (props: any) => {
  const renderRoutes = () => {
    let loggedUserData = CommonFunctions.getItemFromLocalStorage("userInfo");

    let isAuthenticated = loggedUserData ? true : false;
    return (routesData || []).map((route: any, i: any) => {
      return route.isProtected ? (
        <Route
          path={route.path}
          element={
            isAuthenticated ? <route.component /> : <Navigate to="/login" />
          }
          key={i}
        />
      ) : (
        <Route path={route.path} key={i} element={<route.component />} />
      );
    });
  };

  return (
    <Suspense fallback={<SplashLoader loader="danger" />}>
      <Routes>{renderRoutes()}</Routes>
    </Suspense>
  );
};
export default AppRoutes;
