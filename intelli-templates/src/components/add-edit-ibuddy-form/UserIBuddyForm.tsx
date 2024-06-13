import React from "react";
import { InputWithMovingLabel } from "intelli-ui-components-library";
import styles from "./userIBuddyForm.module.scss";
import { useSelector } from "react-redux";
import ItalkImageSelector from "../add-edit-italk-form/ItalkImageSelector";
import { dispatch } from "redux-store/actions/modelActions";
import { setBuddyImages } from "redux-store/actions/iBuddyAction";
import {
  addEditIBuddyUserType,
  userIBuddyFormProps,
} from "./iAddEditIbuddyForm";

const UserIBuddyForm: React.FC<userIBuddyFormProps> = ({
  errors,
  formData,
  handleChange,
}) => {
  const iBuddyUserData: addEditIBuddyUserType = useSelector(
    (state: any) => state.iBuddyId.addEditIBuddyUser
  );
  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgKey: string
  ) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      dispatch(setBuddyImages({ fileData: selectedFile, imgKey: imgKey }));
    }
  };

  const handleClose = (imgKey: string) => {
    dispatch(setBuddyImages({ fileData: "", imgKey: imgKey }));
  };

  return (
    <div className={styles["form-container"]}>
      <div className="mgb-20">
        <div className="mgtb-15">
          <div className={styles["profile-title"]}>Buddy Banner Image</div>
          <ItalkImageSelector
            errorMsg={errors.buddyBackground}
            handleImageSelect={handleImageSelect}
            isEdit={iBuddyUserData.isEdit}
            imgKey="buddyBackground"
            imgUrl={iBuddyUserData.buddyBackground}
            handleClose={handleClose}
          />
        </div>
        <div className="mgtb-15">
          <div className={styles["profile-title"]}>Joinee Banner Image</div>
          <ItalkImageSelector
            errorMsg={errors.joineeBackground}
            handleImageSelect={handleImageSelect}
            isEdit={iBuddyUserData.isEdit}
            imgKey="joineeBackground"
            imgUrl={iBuddyUserData.joineeBackground}
            handleClose={handleClose}
          />
        </div>

        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "joinee_first_name",
            value: formData.joinee_first_name,
            label: "First Name",
            onChange: handleChange,
          }}
          errorMsg={errors.joinee_first_name || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "joinee_last_name",
            value: formData.joinee_last_name,
            label: "Last Name",
            onChange: handleChange,
          }}
          errorMsg={errors.joinee_last_name || ""}
        ></InputWithMovingLabel>
      </div>
      <div className={styles["input-group"]}>
        <InputWithMovingLabel
          inputProps={{
            type: "date",
            name: "from_date",
            value: formData.from_date,
            label: "From Date",
            onChange: (e) => handleChange(e),
          }}
          top={true}
          errorMsg={errors.from_date || ""}
        ></InputWithMovingLabel>
        <InputWithMovingLabel
          inputProps={{
            type: "date",
            name: "to_date",
            value: formData.to_date,
            label: "To Date",
            onChange: handleChange,
          }}
          top={true}
          errorMsg={errors.to_date || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "buddy_text",
            value: formData.buddy_text,
            label: "Buddy Text",
            onChange: handleChange,
          }}
          errorMsg={errors.buddy_text || ""}
        ></InputWithMovingLabel>
      </div>
    </div>
  );
};

export default UserIBuddyForm;
