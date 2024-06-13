import React, { useState, useEffect } from "react";
import {
  InputWithMovingLabel,
  TextArea,
  DropDown,
  Form,
  Button,
} from "intelli-ui-components-library";
import styles from "./userForm.module.scss";
import ImageSelector from "../file-selector/ImageSelector";
import BoldNote from "../snack-bar/BoldNote";
import { ObFormProps } from "./iAddEditObForm";
const EmployeeForm = ({
  errors,
  formData,
  handleChange,
  handleDropDown,
  isEdit,
}: ObFormProps) => {
  console.log("errors", errors);
  return (
    <div className={styles["form-container"]}>
      <div className="mgtb-15">
        <ImageSelector errorMsg={errors.image} isEdit={isEdit} />
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "title",
            value: formData.title,
            label: "Title",
            onChange: handleChange,
          }}
          errorMsg={errors.title || ""}
        ></InputWithMovingLabel>
      </div>

      <div className={styles["input-group"]}>
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "first_name",
            value: formData.first_name,
            label: "First Name",
            onChange: (e) => handleChange(e),
          }}
          errorMsg={errors.first_name || ""}
          // preAppend="+91"
        ></InputWithMovingLabel>
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "last_name",
            value: formData.last_name,
            label: "Last Name",
            onChange: handleChange,
          }}
          errorMsg={errors.last_name || ""}
          // preAppend="+91"
        ></InputWithMovingLabel>
      </div>
      <div className={styles["input-group"]}>
        <div className="mgb-20">
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "email",
              value: formData.email,
              label: "Email",
              onChange: handleChange,
            }}
            errorMsg={errors.email || ""}
          ></InputWithMovingLabel>
        </div>

        <div className="mgb-20">
          <InputWithMovingLabel
            inputProps={{
              type: "text",
              name: "mobile_no",
              value: formData.mobile_no,
              label: "Mobile No.",
              onChange: handleChange,
            }}
            errorMsg={errors.mobile_no || ""}
            // preAppend="+91"
          ></InputWithMovingLabel>
        </div>
      </div>

      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "designation",
            value: formData.designation,
            label: "Designation",
            onChange: handleChange,
          }}
          errorMsg={errors.designation || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "manager",
            value: formData.manager,
            label: "Manager",
            onChange: handleChange,
          }}
          errorMsg={errors.manager || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20" style={{ border: "red" }}>
        <DropDown
          className={"option-list"}
          optionList={[
            { label: "Mumbai", key: "mumbai" },
            { label: "Pune", key: "pune" },
            { label: "Banglore", key: "banglore" },
          ]}
          placeholder="Location"
          value={formData.location}
          onChange={handleDropDown}
          error={!!errors.location}
        ></DropDown>

        <div className="font-12 mgt-5" style={{ color: "red" }}>
          {errors.location || ""}
        </div>
      </div>
      <BoldNote />
      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "info",
            value: formData.info,
            label: "Info",
            onChange: handleChange,
          }}
          errorMsg={errors.info || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>
      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "education",
            value: formData.education,
            label: "Education",
            onChange: handleChange,
          }}
          errorMsg={errors.education || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>

      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "past_detail",
            value: formData.past_detail,
            label: "Past detail",
            onChange: handleChange,
          }}
          errorMsg={errors.past_detail || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>
      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "life_style",
            value: formData.life_style,
            label: "Life Style",
            onChange: handleChange,
          }}
          errorMsg={errors.life_style || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>
      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "wish_text",
            value: formData.wish_text,
            label: "wish text",
            onChange: handleChange,
          }}
          errorMsg={errors.wish_text || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>
    </div>
  );
};

export default EmployeeForm;
