import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./resgistration.module.scss";
import {
  Button,
  DropDown,
  InputWithMovingLabel,
  Typography,
} from "intelli-ui-components-library";
import { useSelector } from "react-redux";
import { CREATE_USER_STATUS } from "graphQL/registration-user/createUser";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CHECK_EMAIL } from "graphQL/registration-user/emailCheck";
import { showSnackBar } from "utils/snackBarUtils";
import { type } from "os";
const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const intelliLogo: string = useSelector(
    (state: any) => state.strapi.artifacts.logo
  );
  const [userData, setUserData] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
    userRole: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, updateErrors] = useState<Record<string, string>>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Api query for create user and check email
  const [createUser] = useMutation(CREATE_USER_STATUS);
  const [checkMail] = useLazyQuery(CHECK_EMAIL);

  //check email Data

  const handleChange = (event: any, key: string) => {
    const value = event.target.value;
    const tempValues = { ...userData };
    tempValues[key] = value;
    setUserData({ ...tempValues });
  };
  const optionList = [
    { label: "HR", key: "hr" },
    { label: "Marketing", key: "marketing" },
    { label: "T&D", key: "t&d" },
  ];

  const onChange = (e: any, value: number) => {
    setUserData({ ...userData, userRole: e.key });
  };
  const validateFieldCheck = () => {
    const values = { ...userData };
    const stringRegex = /^[a-zA-Z\s]*$/;
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errorObj = {};
    let isError = false;

    if (!values.firstName) {
      errorObj["firstName"] = "First name cannot be empty.";
    }
    if (!stringRegex.test(values.firstName)) {
      errorObj["firstName"] = "Enter valid first name";
    }
    if (values.firstName.length < 3) {
      errorObj["firstName"] = "First name must have atleast 3 characters";
    }

    if (!values.lastName) {
      errorObj["lastName"] = "Last name cannot be empty.";
    }
    if (!stringRegex.test(values.lastName)) {
      errorObj["lastName"] = "Enter Valid Lastname";
    }
    if (values.lastName.length < 3) {
      errorObj["lastName"] = "Last name must have at least 3 characters.";
    }

    if (!values.email || !emailRegEx.test(values.email)) {
      errorObj["email"] = "Please enter a valid Email";
    }

    if (!values.password) {
      errorObj["password"] = "Password cannot be empty";
    }
    if (values.password.length < 8) {
      errorObj["password"] = "Password must have at least 8 characters.";
    }

    if (values.confirmPassword != values.password) {
      errorObj["confirmPassword"] =
        "Confirm password not matched with Password";
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
      checkMail({
        variables: {
          email: userData.email,
        },
      })
        .then((res) => {
          if (res.data && res.data.signUps) {
            if (res.data.signUps.data.length) {
              showSnackBar(
                "Email aready exist please use different one",
                "error"
              );
            } else {
              handleOnClick();
            }
          }
        })
        .catch((err) => {
          showSnackBar("Something went wrong!", "error");
        });
    }
  };

  const handleFocus = (e: any, key: string) => {
    const newErrors = { ...errors };
    newErrors[key] = "";
    updateErrors(newErrors);
  };

  const handleOnClick = () => {
    const timeStamp = new Date().toISOString();
    createUser({
      variables: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        email: userData.email,
        role: userData.userRole,
        publishedAt: timeStamp,
      },
    })
      .then((res) => {
        if (res.data) {
          showSnackBar("User sign up successful", "success");
          navigate("/login");
        }
      })
      .catch((err) => {
        showSnackBar("Something went wrong!", "error");
      });
  };
  console.log("OptionList", optionList);
  return (
    <>
      <div className={style["register-main"]}>
        <div className={style["registration-container"]}>
          <div className={`${style["logo-title"]} mgb-20`}>
            <div className="font-24 fs-b">Register</div>
            <img
              src={intelliLogo}
              style={{ width: "20%", height: "30%" }}
            ></img>
          </div>
          <Grid container className={style["grid-conatiner"]} spacing={2}>
            <Grid item md={6}>
              <InputWithMovingLabel
                inputProps={{
                  type: "text",
                  value: userData.firstName,
                  label: "First Name",
                  onChange: (e) => handleChange(e, "firstName"),
                  onFocus: (e) => handleFocus(e, "firstName"),
                }}
                errorMsg={errors.firstName !== "" ? errors.firstName : ""}
              ></InputWithMovingLabel>
            </Grid>
            <Grid item md={6}>
              <InputWithMovingLabel
                inputProps={{
                  type: "text",
                  value: userData.lastName,
                  label: "Last Name",
                  onChange: (e) => handleChange(e, "lastName"),
                  onFocus: (e) => handleFocus(e, "lastName"),
                }}
                errorMsg={errors.lastName !== "" ? errors.lastName : ""}
              ></InputWithMovingLabel>
            </Grid>
          </Grid>
          <Grid container className={style["grid-conatiner"]}>
            <Grid item md={12}>
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
            </Grid>
          </Grid>
          <Grid container className={style["grid-conatiner"]}>
            <Grid item md={12}>
              <DropDown
                optionList={optionList}
                value={userData.userRole}
                placeholder="Select Role"
                onChange={onChange}
              ></DropDown>
            </Grid>
          </Grid>

          <Grid container className={style["grid-conatiner"]} spacing={2}>
            <Grid item md={6}>
              <InputWithMovingLabel
                inputProps={{
                  type: "password",
                  value: userData.password,
                  label: "Password",
                  onChange: (e) => handleChange(e, "password"),
                  onFocus: (e) => handleFocus(e, "password"),
                }}
                errorMsg={errors.password !== "" ? errors.password : ""}
              ></InputWithMovingLabel>
            </Grid>
            <Grid item md={6}>
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
              ></InputWithMovingLabel>
            </Grid>
          </Grid>
          <Grid container className={style["grid-conatiner"]}>
            <Grid item md={12}>
              <Button
                variant="contained"
                round="round"
                size="lg"
                block
                className={style["submit-button"]}
                onClick={validateFieldCheck}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
          <div className="mgt-20">
            <Link
              className={`${style["signup-link"]} mgl-5 font-14`}
              to={"/login"}
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
