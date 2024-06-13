/* eslint-disable react/react-in-jsx-scope */
import {
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Theme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GetGlobalData } from "./contexts/strapiContext";
import { getClientName } from "./utils/generalUtils";
import "./app.scss";
import Layout from "container/layout/Layout";
import SplashLoader from "components/splash-loader/SplashLoader";
import { showSnackBar } from "utils/snackBarUtils";
import { errorStrapi, setStrapi } from "redux-store/actions/strapiActions";

const App: React.FC = () => {
  const [config, setConfig] = useState<any>({
    loading: true,
    isError: false,
    clientName: getClientName(),
  });

  const { loading, clientName } = config;
  const theme = useTheme();
  // const ThemeMapping: Record<string, Theme> = {};

  const [dynamicTheme, setDynamicTheme] = useState<Theme>(theme);

  const dispatch = useDispatch();
  const [errorData, setError] = useState<any>({});

  useEffect(() => {
    const setOnline = () => {
      showSnackBar(errorData.onlineErrorMessage);
    };
    const setOffline = () => {
      showSnackBar(errorData.offlineErrorMessage);
    };
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, [errorData]);

  // this useEffect is to disable devtools in browser
  useEffect(() => {
    window.addEventListener("keydown", function (event) {
      if (
        event.keyCode === 123 ||
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) ||
        (event.ctrlKey && event.shiftKey && event.keyCode === 67) ||
        (event.ctrlKey && event.shiftKey && event.keyCode === 74) ||
        (event.ctrlKey && event.keyCode === 85)
      ) {
        event.preventDefault();
        alert("Developer tools are not allowed.");
      }
    });

    return () => {
      window.removeEventListener("keydown", function (event) {
        if (
          event.keyCode === 123 ||
          (event.ctrlKey && event.shiftKey && event.keyCode === 73) ||
          (event.ctrlKey && event.shiftKey && event.keyCode === 67) ||
          (event.ctrlKey && event.shiftKey && event.keyCode === 74) ||
          (event.ctrlKey && event.keyCode === 85)
        ) {
          event.preventDefault();
          alert("Developer tools are not allowed.");
        }
      });
    };
  }, []);

  // get client details and fetch-all call before loading app
  useEffect(() => {
    const clientName = getClientName();
    setConfig({ loading: true, isError: false, clientName: clientName });
    getThemeDataAsync();
  }, []);

  async function getThemeDataAsync() {
    const { theme, error, welcomeMailers, artifacts, ...rest } =
      await GetGlobalData();
    setDynamicTheme(theme);
    setError(error);
    dispatch(setStrapi({ welcomeMailers, artifacts: artifacts }));
    dispatch(errorStrapi(error));
    document.fonts.onloadingdone = () => {
      setConfig({ loading: false, isError: false, clientName: clientName });
    };
  }

  const renderApp = () => {
    if (!loading) {
      return <Layout clientName={clientName} />;
    } else {
      return <SplashLoader loader="danger" />;
    }
  };

  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      <BrowserRouter>{renderApp()}</BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
