import * as React from "react";
import axios from "axios";
import { showSnackBar } from "utils/snackBarUtils";
import {
  Button,
  InputWithMovingLabel,
  Modal,
} from "intelli-ui-components-library";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import styles from "./emailForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeEmail } from "redux-store/actions/sendEmailActions";
import { setLoader } from "redux-store/actions/strapiActions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EmailForm = () => {
  const [loading, setLoading] = React.useState(false);
  const [to, setTo] = React.useState("");
  const [more, setMore] = React.useState(false);
  const [ccBcc, setCcBcc] = React.useState({
    bcc: "",
    cc: "",
  });
  const [subject, setSubject] = React.useState("");
  const [error, setError] = React.useState({
    to: "",
    subject: "",
  });
  const preview = React.useRef<any>(null);
  const dispatch = useDispatch();
  const file: Blob | null = useSelector((state: any) => state.sendEmail.file);

  const onSubmit = async () => {
    if (loading) return;

    const errObj = {
      to: "",
      subject: "",
    };
    let isError = false;

    if (more && !to && !Object.values(ccBcc).filter(Boolean).length) {
      errObj.to = "Enter email in any one of the field";
      isError = true;
    }

    //to set to email error
    else if (!more && !to) {
      errObj.to = "To (Email Address) is required";
      isError = true;
    }

    //to set to Subject error error
    if (!subject) {
      errObj.subject = "Subject is required";
      isError = true;
    }

    setError(errObj);

    //return if any of the value is not present
    if (isError) return;

    //if both valies are present the clier that error

    setLoading(true);
    dispatch(setLoader(true));
    let formJson = { to, subject };
    try {
      //to upload file on server
      const newData = new FormData();
      newData.append("files", file!, `templet-${Date.now()}`);
      const config = {
        onUploadProgress: (progressEvent: any) => {
          console.log(progressEvent.progress * 100);
        },
      };
      const { data: filpath } = await axios.post(
        `${process.env.REACT_APP_STRAPI_BASE_URL}/api/upload`,
        newData,
        config
      );
      if (more) formJson = { ...formJson, ...ccBcc };
      if (filpath && filpath?.[0]?.url) {
        formJson["filePath"] = filpath[0].url;

        const { data } = await axios.post(
          `${process.env.REACT_APP_STRAPI_BASE_URL}/api/strapi-mail`,
          formJson
        );
        showSnackBar(data?.message, "success");
      }

      dispatch(closeEmail());
    } catch (e) {
      console.log(e);
      showSnackBar("Error while sending Email", "error");
    } finally {
      setLoading(false);
      dispatch(setLoader(false));
    }
  };

  const handleCcBcc = (event: any) => {
    setCcBcc((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  React.useEffect(() => {
    if (file && preview.current) {
      preview.current.src = URL.createObjectURL(file);
    }
  }, [file]);
  return (
    <Modal
      onHidden={() => dispatch(closeEmail())}
      showOverlay={true}
      setting={{
        modalId: "center-btn",
        className: "center-btn-ex",
        variant: "action",
      }}
      childClassName={styles.container}
    >
      <Modal.CloseIcon />
      <Modal.Header>
        <h3 className="font-16 fs-b">Send a Email</h3>
      </Modal.Header>
      <Modal.Body className={styles["model-body"]}>
        <div className={styles["form-Container"]}>
          <div className={styles.toContainer}>
            <InputWithMovingLabel
              inputProps={{
                type: "email",
                name: "to",
                value: to,
                label: "To (Email Address)",
                onChange: (x) => setTo(x.target.value),
              }}
              errorMsg={error?.to || ""}
              className={styles.input}
            />
            <Button
              variant="text"
              onClick={() => setMore(!more)}
              title="Bcc CC Email Address"
              style={{ padding: 0, color: "rgb(255, 0, 13)" }}
            >
              {more ? <RemoveIcon /> : <AddIcon />}
            </Button>
          </div>
          {more && (
            <>
              <div className="mgtb-20">
                <InputWithMovingLabel
                  inputProps={{
                    type: "email",
                    name: "cc",
                    value: ccBcc?.cc,
                    label: "CC (Email Address)",
                    onChange: handleCcBcc,
                  }}
                  errorMsg={error?.to || ""}
                />
              </div>
              <div>
                <InputWithMovingLabel
                  inputProps={{
                    type: "email",
                    name: "bcc",
                    value: ccBcc?.bcc,
                    label: "Bcc (Email Address)",
                    onChange: handleCcBcc,
                  }}
                  errorMsg={error?.to || ""}
                />
              </div>
            </>
          )}
          <p className={styles.note}>
            <strong>Note:</strong> if you have multiple email address you can
            add them in comma seperated ex:
            <i>
              <b>abc@intelliswift.com,xyz@intelliswift.com</b>
            </i>
          </p>
          <div className="mgb-20">
            <InputWithMovingLabel
              inputProps={{
                type: "text",
                name: "subject",
                value: subject,
                label: "Subject",
                onChange: (x) => setSubject(x.target.value),
              }}
              errorMsg={error?.subject || ""}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.CenterButton variant="error" btnClick={onSubmit}>
        {loading ? "Sending..." : "Send"}
        <span style={{ margin: "5px 0px 0px 5px" }}>
          <MailOutlineIcon fontSize="small" />
        </span>
      </Modal.CenterButton>
    </Modal>
  );
};

export default EmailForm;
