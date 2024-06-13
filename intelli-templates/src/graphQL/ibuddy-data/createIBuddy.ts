import { gql } from "apollo-boost";

export const CREATE_IBUDDY_USER = gql`
  mutation createIntelliIbuddy(
    $joinee_first_name: String
    $joinee_last_name: String
    $from_date: String
    $to_date: String
    $buddy_text: String
    $marketing_approval: Boolean
    $hr_approval: Boolean
    $publishedAt: DateTime
  ) {
    createIntelliBuddy(
      data: {
        joinee_first_name: $joinee_first_name
        joinee_last_name: $joinee_last_name
        from_date: $from_date
        to_date: $to_date
        buddy_text: $buddy_text
        marketing_approval: $marketing_approval
        hr_approval: $hr_approval
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          hr_approval
        }
      }
    }
  }
`;
