import { gql } from "apollo-boost";

export const GET_ILEAP_USER_ID_DATA = gql`
  query GetILeapById($userId: ID) {
    intelliILeap(id: $userId) {
      data {
        id
        attributes {
          header_text
          first_paragraph
          second_paragraph
          topics
          background_image {
            data {
              attributes {
                url
                name
              }
            }
          }
        }
      }
    }
  }
`;
