import { gql } from "apollo-boost";
export const CREATE_INTELLI_LEAP = gql`
  mutation CreateIntelliILeap(
    $header_text: String
    $first_paragraph: String
    $second_paragraph: String
    $topics: JSON
    $publishedAt: DateTime
  ) {
    createIntelliILeap(
      data: {
        header_text: $header_text
        first_paragraph: $first_paragraph
        second_paragraph: $second_paragraph
        topics: $topics
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          header_text
          first_paragraph
          second_paragraph
          topics
          publishedAt
        }
      }
    }
  }
`;
