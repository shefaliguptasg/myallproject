import React from "react";
import { InputWithMovingLabel, TextArea } from "intelli-ui-components-library";
import styles from "./userTndForm.module.scss";
import ImageSelector from "../file-selector/ImageSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { addEditTndUser } from "redux-store/actions/tndActions";
import { useDispatch } from "react-redux";
import BoldNote from "../snack-bar/BoldNote";

const TndForm = ({ errors, formData, handleChange, isEdit }: any) => {
  const dispatch = useDispatch();
  const updatetdSection = (index: number, value: string) => {
    const formItalkObj = { ...formData };
    let tdList = [...formItalkObj.td_section];
    tdList[index] = value;
    formItalkObj["td_section"] = [...tdList];
    dispatch(addEditTndUser(formItalkObj));
  };

  const addTdSection = () => {
    let formItalkObj = { ...formData };
    formItalkObj["td_section"] = [...formItalkObj.td_section, ""];
    dispatch(addEditTndUser(formItalkObj));
  };

  const removeTdSection = (index: number) => {
    if (formData.td_section.length === 1) {
      return;
    }
    const formItalkObj = { ...formData };
    const tdList = [...formItalkObj.td_section];
    tdList.splice(index, 1);
    formItalkObj["td_section"] = [...tdList];
    dispatch(addEditTndUser(formItalkObj));
  };

  return (
    <div className={styles["form-container"]}>
      <div className="mgb-20">
        <div className="mgtb-15">
          <ImageSelector errorMsg={errors.image} isEdit={isEdit} />
        </div>
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
        {/* First Name*/}
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "first_name",
            value: formData.first_name,
            label: "First Name",
            onChange: (e) => handleChange(e),
          }}
          errorMsg={errors.first_name || ""}
        ></InputWithMovingLabel>
        {/* Last Name */}
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "last_name",
            value: formData.last_name,
            label: "Last Name",
            onChange: handleChange,
          }}
          errorMsg={errors.last_name || ""}
        ></InputWithMovingLabel>
      </div>

      {/* Designation */}
      <div className="mgb-20 mgt-20">
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
      <BoldNote />
      <div className="mgb-20">
        {formData.td_section.map((td: any, index: any) => (
          <div key={index} className={styles["topic-holder"]}>
            <div className="mgb-10" style={{ flex: "0.97" }}>
              <TextArea
                inputProps={{
                  type: "text",
                  name: `td_section_${index}`,
                  value: td,
                  label: `Section ${index + 1}`,
                  onChange: (e: any) => updatetdSection(index, e.target.value),
                }}
                multiLine={true}
                rows={1}
                errorMsg={(errors.td_section && errors.td_section[index]) || ""}
              />
            </div>
            {index > 1 ? (
              <div
                className={`${styles["remove-icon"]} ${
                  formData.td_section.length === 1 ? styles["disabled"] : ""
                }`}
                onClick={() => removeTdSection(index)}
              >
                <DeleteIcon />
              </div>
            ) : null}
          </div>
        ))}
        {formData.td_section.length < 4 && (
          <div className={styles["custom-add-icon"]} onClick={addTdSection}>
            <span className={styles["custom-btn-wrap"]}>
              <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
              <span>Add Another section</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TndForm;
