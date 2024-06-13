import { gql } from "apollo-boost";
export const CREATE_INTELLI_TALK = gql`
  mutation createIntelliItalk(
    $title: String
    $first_name: String
    $last_name: String
    $designation: String
    $attendee_text: String
    $info: String
    $topic_name: String
    $date: String
    $from: String
    $to: String
    $join_us: String
    $topics: JSON
    $hr_approval: Boolean
    $marketing_approval: Boolean
    $publishedAt: DateTime
  ) {
    createIntelliTalk(
      data: {
        title: $title
        first_name: $first_name
        topics: $topics
        last_name: $last_name
        designation: $designation
        attendee_text: $attendee_text
        info: $info
        date: $date
        from: $from
        to: $to
        join_us: $join_us
        topic_name: $topic_name
        hr_approval: $hr_approval
        marketing_approval: $marketing_approval
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          first_name
          last_name
        }
      }
    }
  }
`;
