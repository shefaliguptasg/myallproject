import { gql } from "apollo-boost";

export const UPDATE_LEARNING_USER = gql`
  mutation updateLearningLeague(
    $userId: ID!
    $user_data: JSON
    $section_data: JSON
  ) {
    updateLearningLeague(
      id: $userId
      data: { user_data: $user_data, section_data: $section_data }
    ) {
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
