import { gql } from "apollo-boost";

export const CREAT_LEARNING_USER = gql`
  mutation createLearningLeague(
    $user_data: JSON
    $section_data: JSON
    $publishedAt: DateTime
  ) {
    createLearningLeague(
      data: {
        user_data: $user_data
        section_data: $section_data
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          user_data
        }
      }
    }
  }
`;
