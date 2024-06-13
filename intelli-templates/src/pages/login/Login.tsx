import { Grid } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommonFunctions from "utils/commonFunction";
import { LOGIN_USER } from "graphQL/login-user/loginUser";
import style from "./login.module.scss";
import { Button, InputWithMovingLabel } from "intelli-ui-components-library";
import login_image from "../../assets/images/left_container_image.jpg";
import intelliswift_logo from "../../assets/images/intelli final logo.svg";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { showSnackBar } from "utils/snackBarUtils";
import HorizontalBar from "../../components/common/horizontalbar/HorizontalBar";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Login = () => {
  const intelliLogo: string = useSelector(
    (state: any) => state.strapi.artifacts.logo
  );
  const [userData, setUserData] = useState<Record<string, string>>({
    email: "",
    password: "",
  });
  const [errors, updateErrors] = useState<Record<string, string>>({
    email: "",
    password: "",
  });
  const [loginUser] = useLazyQuery(LOGIN_USER);
  const navigate = useNavigate();

  const handleChange = (event: any, key: string) => {
    const value = event.target.value;
    const tempValues = { ...userData };
    tempValues[key] = value;
    setUserData({ ...tempValues });
  };

  const validateFieldCheck = () => {
    const values = { ...userData };
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errorObj = {};
    let isError = false;

    if (!values.email || !emailRegEx.test(values.email)) {
      errorObj["email"] = "Please enter a valid Email";
    }

    if (values.password.length < 8) {
      errorObj["password"] = "Password must have at least 8 characters.";
    }
    if (!values.password) {
      errorObj["password"] = "Password cannot be empty";
    }

    if (Object.keys(errorObj).length) {
      Object.keys(errorObj).forEach((cur) => {
        if (errorObj[cur]) {
          showSnackBar(errorObj[cur], "error");
        }
        isError = true;
      });
    }

    updateErrors({ ...errorObj });

    if (!isError) {
      handleOnClick();
    }
  };

  const handleFocus = (e: any, key: string) => {
    const newErrors = { ...errors };
    newErrors[key] = "";
    updateErrors(newErrors);
  };

  const handleOnClick = () => {
    loginUser({
      variables: {
        email: userData.email,
        password: userData.password,
      },
    })
      .then((res) => {
        if (res.data.signUps.data.length) {
          const userInfo = res.data.signUps.data[0].attributes;
          CommonFunctions.setItemInLocalStorage(
            "userInfo",
            JSON.stringify(userInfo)
          );
          showSnackBar("User login successful", "success");
          navigate("/");
        } else {
          showSnackBar("Incorrect credentials", "error");
        }
      })
      .catch((err) => {
        showSnackBar("Something went wrong!", "error");
      });
  };

  return (
    <div className={style["login-main-page"]}>
      {/* Left Container */}
      <div className={style["left-container"]}>
        <div className={style["image-container"]}>
          <img src={login_image} alt="Login_Image" />
        </div>
        <div>
          <div className={style["overlay-text"]}>
            <p>http://www.intelliswift.com</p>
          </div>
        </div>
      </div>
      {/* Right Container */}
      <div className={`${style["right-container"]}`}>
        <div className={style["register-main"]}>
          <img
            src={intelliswift_logo}
            style={{ width: "200px", height: "100px" }}
            alt="Logo"
          ></img>
          <div className={style["registration-container"]}>
            <div className={`${style["logo-title"]} mgb-20`}>
              <div>
                <div className="font-20 fs-b">
                  <p>Hello</p>
                </div>
                <p className="font-15 ">Welcome back!</p>
              </div>
            </div>
            <div className="mgb-20">
              <InputWithMovingLabel
                inputProps={{
                  type: "email",
                  value: userData.email,
                  label: "Email",
                  onChange: (e) => handleChange(e, "email"),
                  onFocus: (e) => handleFocus(e, "email"),
                }}
                rightHtml={<EmailOutlinedIcon />}
                errorMsg={errors.email !== "" ? errors.email : ""}
              ></InputWithMovingLabel>
            </div>
            <div className="mgb-10">
              <InputWithMovingLabel
                inputProps={{
                  type: "password",
                  value: userData.password,
                  label: "Password",
                  onChange: (e) => handleChange(e, "password"),
                  onFocus: (e) => handleFocus(e, "password"),
                }}
                errorMsg={errors.password !== "" ? errors.password : ""}
                passwordInvisibilityIcon={<VisibilityOutlinedIcon />}
                passwordVisibilityIcon={<VisibilityOffOutlinedIcon />}
              ></InputWithMovingLabel>
            </div>
            <div className={`${style["forgot-password-block"]}`}>
              <div className="">
                <label>
                  <input
                    type="checkbox"
                    style={{
                      width: "14.5px",
                      height: "14.5px",
                      margin: "0 3px 0 0",
                      verticalAlign: "middle",
                    }}
                    onChange={() => {}}
                  />
                  Stay signed in
                </label>
              </div>
              <Link
                className={`${style["signup-link"]} mgl-5 font-14`}
                to={"/forgetpassword"}
              >
                Forgot Password?
              </Link>
            </div>
            <Grid container className={style["grid-conatiner"]}>
              <Grid item md={12}>
                <div className={"mgt-15"}>
                  <Button
                    variant="contained"
                    color="info"
                    round="round"
                    size="lg"
                    block
                    className={style["submit-button"]}
                    onClick={validateFieldCheck}
                  >
                    Login
                  </Button>
                </div>
              </Grid>
              <Grid item md={12} className={style["login-links"]}>
                Don't have an account?
                <Link
                  className={`${style["signup-link"]} mgl-5 font-14`}
                  to={"/register"}
                >
                  Sign up
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
        {/* Footer Block */}
        <div className={`${style["footer-container"]}`}>
          <HorizontalBar className={`${style["horizontal-bar"]}`} />
          {/* <HorizontalBar /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
