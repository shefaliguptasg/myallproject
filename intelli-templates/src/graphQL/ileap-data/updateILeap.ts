import { gql } from "apollo-boost";
export const UPDATE_INTELLI_LEAP = gql`
  mutation updateIntelliILeap(
    $userId: ID!
    $header_text: String
    $first_paragraph: String
    $second_paragraph: String
    $topics: JSON
  ) {
    updateIntelliILeap(
      id: $userId
      data: {
        header_text: $header_text
        first_paragraph: $first_paragraph
        second_paragraph: $second_paragraph
        topics: $topics
      }
    ) {
      data {
        id
        attributes {
          header_text
          first_paragraph
          second_paragraph
          topics
        }
      }
    }
  }
`;
