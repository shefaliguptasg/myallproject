import { gql } from "apollo-boost";
export const UPDATE_INTELLI_TALK = gql`
  mutation updateIntelliTalk(
    $userId: ID!
    $title: String
    $first_name: String
    $last_name: String
    $info: String
    $join_us: String
    $from: String
    $date: String
    $to: String
    $designation: String
    $topic_name: String
    $topics: JSON
    $attendee_text: String
    $hr_approval: Boolean
    $marketing_approval: Boolean
  ) {
    updateIntelliTalk(
      id: $userId
      data: {
        title: $title
        first_name: $first_name
        last_name: $last_name
        info: $info
        join_us: $join_us
        date: $date
        designation: $designation
        topic_name: $topic_name
        from: $from
        to: $to
        attendee_text: $attendee_text
        topics: $topics
        hr_approval: $hr_approval
        marketing_approval: $marketing_approval
      }
    ) {
      data {
        id
        attributes {
          hr_approval
          marketing_approval
          first_name
          last_name
        }
      }
    }
  }
`;
