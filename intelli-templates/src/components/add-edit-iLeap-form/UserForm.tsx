import { InputWithMovingLabel, TextArea } from "intelli-ui-components-library";
import styles from "./userForm.module.scss";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditILeapUser,
  setILeapImages,
} from "redux-store/actions/iLeapAction";
import ItalkImageSelector from "../add-edit-italk-form/ItalkImageSelector";

const EmployeeForm = ({ errors, iLeapFormData, handleChange }: any) => {
  const dispatch = useDispatch();

  let iLeapUserData = useSelector(
    (state: any) => state.iLeapId.addEditILeapUser
  );

  const backgroundImageUrl = useSelector(
    (state: any) => state.iLeapId.addEditILeapUser.backgroundImage
  );
  let formData = iLeapUserData.iLeapUserInfo;

  const addTopic = () => {
    let formIleapObj = { ...formData };
    formIleapObj["topics"] = [...formIleapObj.topics, ""];
    dispatch(addEditILeapUser(formIleapObj));
  };

  const removeTopic = (index: number) => {
    if (formData.topics.length === 1) {
      return;
    }
    const formIleapObj = { ...formData };
    const topicsList = [...formIleapObj.topics];
    topicsList.splice(index, 1);
    formIleapObj["topics"] = [...topicsList];
    dispatch(addEditILeapUser(formIleapObj));
  };

  const updateTopic = (index: number, value: string) => {
    const formIleapObj = { ...formData };
    let topicsList = [...formIleapObj.topics];
    topicsList[index] = value;
    formIleapObj["topics"] = [...topicsList];
    dispatch(addEditILeapUser(formIleapObj));
  };

  const handleImageSelect = (e: any, imgKey: string | undefined) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      dispatch(setILeapImages({ fileData: selectedFile, imgKey: imgKey }));
    }
  };
  const handleClose = (imgKey: string | undefined) => {
    dispatch(setILeapImages({ fileData: "", imgKey: imgKey }));
  };
  return (
    <div className={styles["form-container"]}>
      <div className="mgtb-15">
        <div className={styles["profile-title"]}>Background Image</div>
        <ItalkImageSelector
          errorMsg={errors.backgroundImage}
          handleImageSelect={handleImageSelect}
          isEdit={iLeapUserData.isILeapEdit}
          // isEdit={iLeapUserData.isIleapEdit}
          imgKey="backgroundImage"
          imgUrl={backgroundImageUrl}
          handleClose={handleClose}
        />
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "header_text",
            value: iLeapFormData.header_text,
            label: "Header Text",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={errors.header_text || ""}
        ></InputWithMovingLabel>
      </div>

      <div className="mgb-20">
        <TextArea
          className={styles["text-area"]}
          inputProps={{
            type: "text",
            name: "first_paragraph",
            value: iLeapFormData.first_paragraph,
            label: "First Paragraph",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={errors.first_paragraph || ""}
        ></TextArea>
      </div>
      <div className="mgb-20">
        <TextArea
          className={styles["text-area"]}
          inputProps={{
            type: "text",
            name: "second_paragraph",
            value: iLeapFormData.second_paragraph,
            label: "Second Paragraph",
            onChange: (e) => {
              handleChange(e);
            },
          }}
          errorMsg={errors.second_paragraph || ""}
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
