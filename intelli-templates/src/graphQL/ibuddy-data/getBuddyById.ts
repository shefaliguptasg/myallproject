import { gql } from "apollo-boost";

export const GET_IBUDDY_BY_ID = gql`
  query getIBuddyById($userId: ID) {
    intelliBuddy(id: $userId) {
      data {
        id
        attributes {
          joinee_last_name
          joinee_first_name
          from_date
          to_date
          buddy_text
          hr_approval
          marketing_approval
          buddy_background {
            data {
              attributes {
                name
                url
              }
            }
          }
          joinee_background {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
