import { gql } from "apollo-boost";

export const GET_ITALK_USER_ID_DATA = gql`
  query getItalkUserById($userId: ID) {
    intelliTalk(id: $userId) {
      data {
        id
        attributes {
          first_name
          last_name
          title
          attendee_text
          info
          topics
          topic_name
          designation
          date
          from
          to
          join_us
          hr_approval
          marketing_approval
          profile {
            data {
              attributes {
                name
                url
              }
            }
          }
          background {
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
