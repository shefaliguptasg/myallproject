import { TextArea } from "intelli-ui-components-library";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./addEditLearning.module.scss";
import SingleUserSlider from "./SingleUserSlider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector, useDispatch } from "react-redux";
import { addEditLearningUser } from "redux-store/actions/learningAction";

const LearningForm = () => {
  const dispatch = useDispatch();

  const learningUserData = useSelector(
    (state: any) => state.learningLeague.learningUserInfo
  );

  const errorDataObj = useSelector(
    (state: any) => state.learningLeague.errors.sectionData
  );

  const [showSlider, toggleSlider] = useState(false);

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;

    const tempSectionData = [...learningUserData.sectionData];
    tempSectionData[index] = value;

    const tempObj = { ...learningUserData, sectionData: tempSectionData };
    dispatch(addEditLearningUser(tempObj));
  };

  const addSection = () => {
    const tempObj = { ...learningUserData };
    let dummyList = [...learningUserData.sectionData];
    dummyList = [...dummyList, ""];
    tempObj.sectionData = dummyList;
    dispatch(addEditLearningUser(tempObj));
  };

  const deleteSection = (index: number) => {
    if (learningUserData.sectionData.length === 1) {
      return;
    }

    const tempObj = { ...learningUserData };
    const dummyList = [...learningUserData.sectionData];
    dummyList.splice(index, 1);
    tempObj.sectionData = dummyList;

    dispatch(addEditLearningUser(tempObj));
  };

  const handleSlider = (state: boolean) => {
    toggleSlider(state);
  };

  return (
    <div style={{ padding: "20px 10px" }}>
      <div className="mgb-20">
        {learningUserData.sectionData.map((buddy: any, index: number) => (
          <div key={index} className={styles["topic-holder"]}>
            <div className="mgb-10" style={{ flex: "0.97" }}>
              <TextArea
                inputProps={{
                  type: "text",
                  name: `buddy_section_${index}`,
                  value: buddy,
                  label: `Learning Section ${index + 1}`,
                  onChange: (e: any) => handleChange(e, index),
                }}
                errorMsg={errorDataObj[index] || ""}
                multiLine={true}
                rows={1}
              />
            </div>
            {index > 1 ? (
              <div
                className={`${styles["remove-icon"]} ${
                  learningUserData.sectionData.length === 1
                    ? styles["disabled"]
                    : ""
                }`}
                onClick={() => deleteSection(index)}
              >
                <DeleteIcon />
              </div>
            ) : null}
          </div>
        ))}
        {learningUserData.sectionData.length < 4 && (
          <div className={styles["custom-add-icon"]} onClick={addSection}>
            <span className={styles["custom-btn-wrap"]}>
              <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
              <span>Add Another section</span>
            </span>
          </div>
        )}
      </div>
      <div
        className={styles["user-slider-container"]}
        onClick={() => toggleSlider(true)}
      >
        <div className={styles["add-user-holder"]}>
          <div className={styles["user-slider-title"]}>Add User</div>
          <div className={styles["user-slider-count"]}>
            count: {learningUserData.userData.length}
          </div>
        </div>
        <ChevronRightIcon className={styles["right-icon"]} />
      </div>

      {showSlider ? (
        <SingleUserSlider
          users={learningUserData}
          handleSlider={handleSlider}
        />
      ) : null}
    </div>
  );
};

export default LearningForm;
