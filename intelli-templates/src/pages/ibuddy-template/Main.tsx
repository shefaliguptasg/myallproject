import React from "react";
import styles from "./iBuddyTemplate.module.scss";
import { useSelector } from "react-redux";
import CommonFunctions from "utils/commonFunction";

// *** This function is for new Joiner. *** //
export const IBuddyMain = () => {
  const buddyUserData = useSelector((state: any) => state.iBuddyId.iBuddyData);

  return (
    <div className={styles["main-content"]}>
      <div className={styles["content"]}>
        <p>Hi ,</p>

        <p>
          We would like to welcome you to our Intelliswift family. We love to
          work as a team, with enthusiasm, and we have a great learning
          attitude.
        </p>

        <p>
          In order to make your journey at Intelliswift, smooth, effortless, and
          memorable, we have mapped a{" "}
          <span className={styles["text-bold"]}>“Buddy”</span> for you.
          <span className={styles["text-bold"]}>
            {` ${buddyUserData.buddy_text}`}
          </span>
        </p>
        <p>
          Your Buddy will be your friend, your guide, and your colleague who
          shall assist you to overcome various turns and initial hurdles at
          Intelliswift.
        </p>
        <p>
          Buddy, will be glad to go the extra mile to assist you, without
          leaving any stone unturned! Hence, request you to sync up with your
          Buddy, for any queries, doubts, or concerns, who will certainly do
          everything possible to assist you.
        </p>

        <p>
          Our entire team is thrilled to have you onboarded, and we look forward
          to often connect with you, don’t forget we are just call away!
        </p>

        <p>
          Best wishes,
          <div>
            <span className={styles["text-bold"]}>
              Team Talent Development India
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};

// *** This function is for the person who will be mapped as buddy *** //
export const IBuddyMainNew = () => {
  const buddyUserData = useSelector((state: any) => state.iBuddyId.iBuddyData);

  const fromDate = CommonFunctions.toShortFormat(buddyUserData.from_date);
  const toDate = CommonFunctions.toShortFormat(buddyUserData.to_date);

  return (
    <div className={styles["main-content"]}>
      <div className={styles["content"]}>
        <p>Hi ,</p>
        <p>Greetings of the day!</p>
        <p>
          We are glad to say that you’ve been mapped as a{" "}
          <span className={styles["text-bold"]}>Buddy</span> to our new joiner
          <span className={styles["text-bold"]}>
            {` ${buddyUserData.joinee_first_name} ${buddyUserData.joinee_last_name} `}
          </span>
          from the
          <span className={styles["text-bold"]}>
            {" "}
            {fromDate} to {toDate}
          </span>
          . We are certain that, we all had gone through several phases during
          the initial days of our careers. Hence, it would be great if you could
          assist
          <span
            className={styles["text-bold"]}
          >{` ${buddyUserData.joinee_first_name} ${buddyUserData.joinee_last_name} `}</span>
          with any queries, sync up weekly/bi-weekly to understand and mitigate
          work issues, or bring it up to us or to the right team, for quick
          resolution.
        </p>
        <p>
          Let’s not leave any stone un-turned, and go an extra mile to assist
          our new employees, and spread the culture of{" "}
          <span className={styles["text-bold"]}>"Love the New"</span>
        </p>
        <p>
          Please reach out to us for any queries, we shall be glad to assist.
          Also, go through the Buddy Program Deck, that might help you in this
          journey 😊
        </p>
        <p>
          Also, in order to measure effectiveness of this program, we shall
          conduct Biweekly feedback survey request you to share your inputs.
        </p>
        <p>
          Best wishes,
          <div>
            <span className={styles["text-bold"]}>
              Team Talent Development India
            </span>
          </div>
        </p>
      </div>
    </div>
  );
};
