import { gql } from "apollo-boost";

export const UPDATE_WALL_OF_FAME_USER = gql`
  mutation updateIntelliWof(
    $userId: ID!
    $user_data: JSON
    $quarter_year: String
  ) {
    updateIntelliWof(
      id: $userId
      data: { user_data: $user_data, quarter_year: $quarter_year }
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
