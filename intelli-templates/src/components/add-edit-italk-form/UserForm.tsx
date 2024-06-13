import React from "react";
import {
  InputWithMovingLabel,
  TextArea,
  DropDown,
  Button,
} from "intelli-ui-components-library";
import styles from "./userForm.module.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditItalkUser,
  setItalkImages,
} from "redux-store/actions/iTalkAction";
import CommonFunctions from "utils/commonFunction";
import ItalkImageSelector from "./ItalkImageSelector";

const EmployeeForm = ({
  errors,
  iTalkFormData,
  handleChange,
  handleDropDown,
}: any) => {
  const dispatch = useDispatch();
  let iTalkUserData = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser
  );

  const profileImageUrl = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser.profileImage
  );

  const backgroundImageUrl = useSelector(
    (state: any) => state.iTalkId.addEditItalkUser.backgroundImage
  );

  let formData = iTalkUserData.iTalkUserInfo;
  const timeOptions = CommonFunctions.generateTimeOptions();

  const addTopic = () => {
    let formItalkObj = { ...formData };
    formItalkObj["topics"] = [...formItalkObj.topics, ""];
    dispatch(addEditItalkUser(formItalkObj));
  };

  const removeTopic = (index: number) => {
    if (formData.topics.length === 1) {
      return;
    }
    const formItalkObj = { ...formData };
    const topicsList = [...formItalkObj.topics];
    topicsList.splice(index, 1);
    formItalkObj["topics"] = [...topicsList];
    dispatch(addEditItalkUser(formItalkObj));
  };

  const updateTopic = (index: number, value: string) => {
    const formItalkObj = { ...formData };
    let topicsList = [...formItalkObj.topics];
    topicsList[index] = value;
    formItalkObj["topics"] = [...topicsList];
    dispatch(addEditItalkUser(formItalkObj));
  };

  const handleImageSelect = (e: any, imgKey: string | undefined) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      dispatch(setItalkImages({ fileData: selectedFile, imgKey: imgKey }));
    }
  };
  const handleClose = (imgKey: string | undefined) => {
    dispatch(setItalkImages({ fileData: "", imgKey: imgKey }));
  };
  return (
    <div className={styles["form-container"]}>
      <div className="mgtb-15">
        <div className={styles["profile-title"]}>Profile Image</div>
        <ItalkImageSelector
          errorMsg={errors.profileImage}
          handleImageSelect={handleImageSelect}
          isEdit={iTalkUserData.isItalkEdit}
          imgKey="profileImage"
          imgUrl={profileImageUrl}
          handleClose={handleClose}
        />
      </div>
      <div className="mgtb-15">
        <div className={styles["profile-title"]}>Background Image</div>
        <ItalkImageSelector
          errorMsg={errors.backgroundImage}
          handleImageSelect={handleImageSelect}
          isEdit={iTalkUserData.isItalkEdit}
          imgKey="backgroundImage"
          imgUrl={backgroundImageUrl}
          handleClose={handleClose}
        />
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "title",
            value: iTalkFormData.title,
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
            value: iTalkFormData.first_name,
            label: "First Name",
            onChange: handleChange,
          }}
          errorMsg={errors.first_name || ""}
          // preAppend="+91"
        ></InputWithMovingLabel>
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "last_name",
            value: iTalkFormData.last_name,
            label: "Last Name",
            onChange: handleChange,
          }}
          errorMsg={errors.last_name || ""}
          // preAppend="+91"
        ></InputWithMovingLabel>
      </div>

      <div className="mgb-20 ">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "designation",
            value: iTalkFormData.designation,
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
            name: "topic_name",
            value: iTalkFormData.topic_name,
            label: "Topic Name",
            onChange: handleChange,
          }}
          errorMsg={errors.topic_name || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "date",
            name: "date",
            value: iTalkFormData.date,
            label: "Date",
            onChange: handleChange,
          }}
          top={true}
          errorMsg={errors.date || ""}
        ></InputWithMovingLabel>
      </div>
      <div className={styles["drop-time-holder"]} style={{ border: "red" }}>
        <div className={styles["drop-wrap"]}>
          <DropDown
            className={"option-list"}
            optionList={timeOptions}
            placeholder="From"
            value={formData.from}
            error={errors.from}
            onChange={(e) => handleDropDown(e, "from")}
          ></DropDown>
          <div className="font-12 mgt-5" style={{ color: "red" }}>
            {errors.from || ""}
          </div>
        </div>
        <div className={styles["drop-wrap"]}>
          <DropDown
            className={"option-list"}
            optionList={timeOptions}
            placeholder="To"
            error={errors.to}
            value={formData.to}
            onChange={(e) => handleDropDown(e, "to")}
          ></DropDown>
          <div className="font-12 mgt-5" style={{ color: "red" }}>
            {errors.to || ""}
          </div>
        </div>
      </div>
      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "info",
            value: iTalkFormData.info,
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
            name: "join_us",
            value: iTalkFormData.join_us,
            label: "Join Us",
            onChange: handleChange,
          }}
          errorMsg={errors.join_us || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>

      <div className="mgb-20">
        <TextArea
          inputProps={{
            type: "text",
            name: "attendee_text",
            value: iTalkFormData.attendee_text,
            label: "Attendee Text",
            onChange: handleChange,
          }}
          errorMsg={errors.attendee_text || ""}
          multiLine={true}
          rows={1}
        ></TextArea>
      </div>
      <div className="mgb-20">
        {formData.topics.map((topic: any, index: any) => (
          <div key={index} className={styles["topic-holder"]}>
            <div className="mgb-10" style={{ flex: "0.97" }}>
              <InputWithMovingLabel
                inputProps={{
                  type: "text",
                  name: `topics_${index}`,
                  value: topic,
                  label: `Topics ${index + 1}`,
                  onChange: (e: any) => updateTopic(index, e.target.value),
                }}
                errorMsg={(errors.topics && errors.topics[index]) || ""}
              />
            </div>
            <div
              className={`${styles["remove-icon"]} ${
                formData.topics.length === 1 ? styles["disabled"] : ""
              }`}
              onClick={() => removeTopic(index)}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
        {formData.topics.length < 5 && (
          <div className={styles["custom-add-icon"]} onClick={addTopic}>
            <span className={styles["custom-btn-wrap"]}>
              <AddIcon style={{ marginRight: "5px", fontSize: "18px" }} />
              <span>Add Another Topic</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeForm;
