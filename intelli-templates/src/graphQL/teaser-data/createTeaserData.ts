import { gql } from "apollo-boost";

export const CREATE_TEASER_USER = gql`
  mutation createIntelliTeaser(
    $header_text: String
    $salutation: String
    $signature: String
    $section: JSON
    $publishedAt: DateTime
  ) {
    createIntelliTeaser(
      data: {
        header_text: $header_text
        salutation: $salutation
        signature: $signature
        section: $section
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          header_text
        }
      }
    }
  }
`;
