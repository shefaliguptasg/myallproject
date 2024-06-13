import { gql } from "apollo-boost";

export const GET_WALL_OF_FAME_BY_ID = gql`
  query GetWallOfFameById($userId: ID) {
    intelliWof(id: $userId) {
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
