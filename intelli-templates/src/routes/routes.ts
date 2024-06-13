import React, { lazy } from "react";
import Main from "../pages/onBoarding/Main";

const TND = lazy(() => import("../pages/tnd/AppreciationTemplate"));
const IBuddy = lazy(() => import("../pages/ibuddy-template/IBuddy"));
const Login = lazy(() => import("../pages/login/Login"));
const Registration = lazy(() => import("../pages/resistration/Registration"));
const OnBoarding = lazy(() => import("../pages/onBoarding/OnBoarding"));
const ITalk = lazy(() => import("../pages/italk-template/ITalkTemplate"));
const LearningLeague = lazy(
  () => import("../pages/learning-league-template/LearningLeague")
);
const ILeap = lazy(() => import("../pages/iLeap-template/Main"));
const WelcomeMailer = lazy(
  () => import("../pages/welcome-mailer/WelcomeMailer")
);
const DashboardPage = lazy(() => import("../pages/dashboard/Dashboard"));
const MaintenancePage = lazy(() => import("../pages/MaintenancePage"));
const ForgetPassword = lazy(
  () => import("../pages/forgetpassword/ForgetPassword")
);
const CertificationITalk = lazy(
  () => import("../pages/certification/italk/ITalk")
);
const LearningCertificate = lazy(
  () => import("../pages/certification/e-learning/LearningCertificate")
);
const Teaser = lazy(() => import("../pages/teaser-template/Main"));
import AddEditObForm from "../components/add-edit-form/AddEditObForm";
const WallOfFameTemplate = lazy(
  () => import("../pages/wall-of-fame-template/WallOfFameTemplate")
);

export const routesData = [
  {
    path: "/forgetpassword",
    component: ForgetPassword,
    title: "forgetpassword",
    isProtected: false,
  },
  {
    path: "/register",
    component: Registration,
    title: "registration",
    isProtected: false,
  },
  {
    path: "/login",
    component: Login,
    title: "login",
    isProtected: false,
  },
  {
    path: "",
    component: DashboardPage,
    title: "dashboard",
    isProtected: true,
  },
  {
    path: "onbording/:templateId",
    component: OnBoarding,
    title: "home",
    isProtected: true,
  },
  {
    path: "/welcomeMailer/:templateId",
    component: WelcomeMailer,
    title: "Welcome Mailer",
    isProtected: true,
  },
  {
    path: "/add",
    component: AddEditObForm,
    title: "Add Form",
    isProtected: true,
  },
  {
    path: "/appreciation",
    component: TND,
    title: "TND",
    isProtected: true,
  },
  {
    path: "/ibuddy-template",
    component: IBuddy,
    title: "iBuddy Template",
    isProtected: true,
  },
  {
    // for temporary purpose path is /italk will change to /italk-template
    path: "/italk",
    component: ITalk,
    title: "iTalk",
    isProtected: true,
  },
  {
    path: "/learning-league-template",
    component: LearningLeague,
    title: "Learning League Template",
    isProtected: false,
  },
  {
    path: "/certification/italk",
    component: CertificationITalk,
    title: "Certification",
    isProtected: true,
  },
  {
    path: "/certification/:learningId",
    component: LearningCertificate,
    title: "elearning",
    isProtected: true,
  },

  {
    path: "iLeap",
    component: ILeap,
    title: " iLeap template",
    isProtected: false,
  },
  {
    path: "/teaser",
    component: Teaser,
    title: "teaser",
    isProtected: false,
  },
  {
    path: "/wall-of-fame-template",
    component: WallOfFameTemplate,
    title: "Wall Of Fame",
    isProtected: true,
  },
  {
    path: "*",
    component: MaintenancePage,
    title: "Error Page",
    isProtected: false,
  },
];
