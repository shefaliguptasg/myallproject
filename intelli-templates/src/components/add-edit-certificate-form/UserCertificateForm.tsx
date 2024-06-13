import React from "react";
import { InputWithMovingLabel } from "intelli-ui-components-library";
import styles from "./userCertificateForm.module.scss";
import { useDispatch } from "react-redux";
import { userCertificateFormProps } from "./iAddEditCertificateForm";

const UserCertificateForm: React.FC<userCertificateFormProps> = ({
  errors,
  formData,
  handleChange,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles["form-container"]}>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "first_name",
            value: formData.first_name,
            label: "First Name",
            onChange: handleChange,
          }}
          errorMsg={errors.first_name || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
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
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "text",
            name: "certificate_name",
            value: formData.certificate_name,
            label: "Certificate name",
            onChange: handleChange,
          }}
          errorMsg={errors.certificate_name || ""}
        ></InputWithMovingLabel>
      </div>
      <div className="mgb-20">
        <InputWithMovingLabel
          inputProps={{
            type: "date",
            name: "certificate_date",
            value: formData.certificate_date,
            label: "Certificate date",
            onChange: handleChange,
          }}
          top={true}
          errorMsg={errors.certificate_date || ""}
        ></InputWithMovingLabel>
      </div>
    </div>
  );
};

export default UserCertificateForm;
