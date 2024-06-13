import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../resistration/resgistration.module.scss";
import { RESET_PASSWORD } from "graphQL/forget-user/forgetUser";
import { Button, InputWithMovingLabel } from "intelli-ui-components-library";
import { CHECK_EMAIL } from "graphQL/registration-user/emailCheck";
import { useSelector } from "react-redux";
import { useLazyQuery, useMutation } from "@apollo/client";
import { showSnackBar } from "utils/snackBarUtils";

const ForgetPassword = () => {
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
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [userId, setUserId] = useState("");

  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [checkMail] = useLazyQuery(CHECK_EMAIL);

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

    if (showPasswordFields) {
      if (values.password.length < 8) {
        errorObj["password"] = "Password must have at least 8 characters.";
      }
      if (!values.password) {
        errorObj["password"] = "Password cannot be empty";
      }

      if (values.confirmPassword != values.password) {
        errorObj["confirmPassword"] =
          "Confirm password not matched with Password";
      }
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
    return isError;
  };

  const handleFocus = (e: any, key: string) => {
    const newErrors = { ...errors };
    newErrors[key] = "";
    updateErrors(newErrors);
  };

  const handleResetPassword = () => {
    const isError = validateFieldCheck();
    if (!isError && userId) {
      resetPassword({
        variables: {
          id: userId,
          password: userData.password,
        },
      })
        .then((res) => {
          if (res.data && res.data.updateSignUp) {
            showSnackBar("Password changed successfully!", "success");
            navigate("/login");
          }
        })
        .catch((err) => {
          showSnackBar("Something went wrong!", "error");
        });
    } else {
      showSnackBar("User ID not found. Please try again.", "error");
    }
  };

  const handleSubmit = () => {
    const isError = validateFieldCheck();

    if (!isError) {
      checkMail({
        variables: {
          email: userData.email,
        },
      })
        .then((res) => {
          if (res.data && res.data.signUps) {
            if (res.data.signUps.data.length) {
              const fetchedUserId = res.data.signUps.data[0].id;
              setUserId(fetchedUserId);
              setShowPasswordFields(true);
            } else {
              showSnackBar("Email does not exist");
            }
          }
        })
        .catch((err) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };

  return (
    <>
      <div className={style["register-main"]}>
        <div className={style["registration-container"]}>
          <div className={`${style["logo-title"]} mgb-40`}>
            <div className="font-24 fs-b">Forget Password?</div>
            <img
              src={intelliLogo}
              style={{ width: "20%", height: "30%" }}
            ></img>
          </div>
          <div className="">
            <InputWithMovingLabel
              inputProps={{
                type: "email",
                value: userData.email,
                label: "Email",
                onChange: (e) => handleChange(e, "email"),
                onFocus: (e) => handleFocus(e, "email"),
              }}
              errorMsg={errors.email !== "" ? errors.email : ""}
            ></InputWithMovingLabel>
          </div>

          {showPasswordFields ? (
            <>
              <div className="mgtb-20">
                <InputWithMovingLabel
                  inputProps={{
                    type: "password",
                    value: userData.password,
                    label: "Password",
                    onChange: (e) => handleChange(e, "password"),
                    onFocus: (e) => handleFocus(e, "password"),
                  }}
                  errorMsg={errors.password !== "" ? errors.password : ""}
                />
              </div>
              <div className="">
                <InputWithMovingLabel
                  inputProps={{
                    type: "password",
                    value: userData.confirmPassword,
                    label: "Confirm Password",
                    onChange: (e) => handleChange(e, "confirmPassword"),
                    onFocus: (e) => handleFocus(e, "confirmPassword"),
                  }}
                  errorMsg={
                    errors.confirmPassword !== "" ? errors.confirmPassword : ""
                  }
                />
              </div>
            </>
          ) : null}
          <Grid container className={style["grid-conatiner"]}>
            <Grid item md={12}>
              <Button
                variant="contained"
                color="info"
                round="round"
                size="lg"
                block
                className={style["submit-button"]}
                onClick={
                  showPasswordFields ? handleResetPassword : handleSubmit
                }
              >
                {showPasswordFields ? "Reset" : "Submit"}
              </Button>
            </Grid>
          </Grid>
          <div className="mgt-20">
            <Link
              className={`${style["signup-link"]} mgl-5 font-14`}
              to={"/login"}
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
