import { gql } from "apollo-boost";

export const GET_TND_USER_BY_ID = gql`
  query getTndUserById($tndUserId: ID) {
    intelliTnd(id: $tndUserId) {
      data {
        id
        attributes {
          first_name
          last_name
          designation
          hr_approval
          title
          marketing_approval
          td_section
          profile {
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
