import { gql } from "apollo-boost";

export const UPDATE_TEASER_USER = gql`
  mutation updateIntelliTeaser(
    $id: ID!
    $header_text: String
    $salutation: String
    $signature: String
    $section: JSON
    $publishedAt: DateTime
  ) {
    updateIntelliTeaser(
      id: $id
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
