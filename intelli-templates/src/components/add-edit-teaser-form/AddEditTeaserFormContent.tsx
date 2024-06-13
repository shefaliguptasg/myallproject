import React, { useState } from "react";
import { InputWithMovingLabel, TextArea } from "intelli-ui-components-library";
import styles from "./addEditTeaserForm.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ItalkImageSelector from "../add-edit-italk-form/ItalkImageSelector";
import BoldNote from "../snack-bar/BoldNote";
import { ITeaserFormData } from "./iAddEditTeaserInterface";
type IProps = {
  handleChange: (e: any) => void;
  handleAddSection: (e: any) => void;
  teaserFormData: ITeaserFormData;
};
const AddEditTeaserFormContent: React.FC<IProps> = ({
  handleChange,
  handleAddSection,
  teaserFormData,
}) => {
  const addTeaserSection = () => {
    teaserFormData.teaserSection = [...teaserFormData.teaserSection, ""];
    handleAddSection(teaserFormData);
  };

  const removeTeaserSection = (index: number) => {
    if (teaserFormData.teaserSection.length === 1) {
      return;
    }
    teaserFormData.teaserSection.splice(index, 1);
    handleAddSection(teaserFormData);
  };
  const updateTeaserSection = (index: any, value: any) => {
    const formTeaserObj = { ...teaserFormData };
    let teaserList = [...formTeaserObj.teaserSection];
    teaserList[index] = value;
    const obj = {
      target: { name: "teaserSection", value: teaserList },
    };
    handleChange(obj);
  };

  const handleImageSelect = (e: any, imgKey: string | undefined) => {
    const obj = {
      target: { name: imgKey, value: e.target.files && e.target.files[0] },
    };
    handleChange(obj);
  };
  const handleClose = (imgKey: string | undefined) => {
    const obj = {
      target: { name: imgKey, value: "" },
    };
    handleChange(obj);
  };
  return (
    <div className={styles["form-container"]}>
      <div className="mgtb-15">
        <div className={styles["img-title"]}>Background Image</div>
        <ItalkImageSelector
          errorMsg={teaserFormData.errors.backgroundImage}
          handleImageSelect={handleImageSelect}
          isEdit={false}
          imgKey="backgroundImgUrl"
          imgUrl={teaserFormData.backgroundImgUrl}
          handleClose={handleClose}
        />
      </div>
      <div className="mgtb-15">
        <div className={styles["img-title"]}>Header Logo</div>
        <ItalkImageSelector
          errorMsg={teaserFormData.errors.headerLogoImage}
          handleImageSelect={handleImageSelect}
          isEdit={false}
          imgKey="headerLogoImageUrl"
          imgUrl={teaserFormData.headerLogoImageUrl}
          handleClose={handleClose}
        />
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "header_text",
            value: teaserFormData.header_text,
            label: "Header Text",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={teaserFormData.errors.header_text}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "salutation",
            value: teaserFormData.salutation,
            label: "Salutation",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={teaserFormData.errors.salutation}
        ></InputWithMovingLabel>
      </div>
      <BoldNote></BoldNote>
      <div className="mgb-20">
        {teaserFormData?.teaserSection?.map((td: any, index: any) => (
          <div key={index} className={styles["topic-holder"]}>
            <div className="mgb-10" style={{ flex: "0.97" }}>
              <TextArea
                inputProps={{
                  type: "text",
                  name: `section${index}`,
                  value: td,
                  label: `Section ${index + 1}`,
                  onChange: (e: any) =>
                    updateTeaserSection(index, e.target.value),
                }}
                multiLine={true}
                rows={1}
                errorMsg={
                  (teaserFormData.errors.teaserSection &&
                    teaserFormData.errors.teaserSection[index]) ||
                  ""
                }
              />
            </div>
            {index > 0 ? (
              <div
                className={`${styles["remove-icon"]} ${
                  teaserFormData.teaserSection.length === 1
                    ? styles["disabled"]
                    : ""
                }`}
                onClick={() => removeTeaserSection(index)}
              >
                <DeleteIcon />
              </div>
            ) : null}
          </div>
        ))}
        {teaserFormData.teaserSection.length < 4 && (
          <div className={styles["custom-add-icon"]} onClick={addTeaserSection}>
            <span className={styles["custom-btn-wrap"]}>
              <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
              <span>Add Another section</span>
            </span>
          </div>
        )}
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "signature",
            value: teaserFormData.signature,
            label: "Signature",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={teaserFormData.errors.signature}
        ></InputWithMovingLabel>
      </div>
    </div>
  );
};

export default AddEditTeaserFormContent;
