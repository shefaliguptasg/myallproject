import { gql } from "apollo-boost";

export const GET_LEARNING_BY_ID = gql`
  query getLearningById($userId: ID) {
    learningLeague(id: $userId) {
      data {
        id
        attributes {
          user_data
          section_data
        }
      }
    }
  }
`;
