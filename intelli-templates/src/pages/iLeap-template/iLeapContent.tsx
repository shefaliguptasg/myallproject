import styles from "./iLeapTemplate.module.scss";
import logo from "../../assets/images/italk-logo.svg";
import { useSelector } from "react-redux";
import { getFontUrl } from "utils/generalUtils";

const iLeapContent = () => {
  const iLeapData: any = useSelector((state: any) => {
    return state.iLeapId.iLeapData;
  });

  return (
    <div className={styles["main-content"]}>
      <p>Dear Intellians,</p>
      <br />
      <p>{`${iLeapData.first_paragraph}`}</p>
      <br />
      <p>
        <b> In this interactive session, you will:</b>
      </p>
      <div>
        <ul>
          {iLeapData.topics.map((item: any) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>

      <p>
        {`${iLeapData.second_paragraph}`}
        <br />
        We look forward to your presence!
      </p>
      <br />
      <div>
        <div>
          <span>Best Regards,</span>
        </div>
        <div>
          <strong>Team Talent Development</strong>
        </div>
      </div>
    </div>
  );
};

export default iLeapContent;
