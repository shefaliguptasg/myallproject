import { gql } from "apollo-boost";

export const CREATE_WALL_OF_FAME_USER = gql`
  mutation CreateIntelliWof(
    $user_data: JSON
    $quarter_year: String
    $publishedAt: DateTime
  ) {
    createIntelliWof(
      data: {
        user_data: $user_data
        quarter_year: $quarter_year
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          user_data
          quarter_year
        }
      }
    }
  }
`;
