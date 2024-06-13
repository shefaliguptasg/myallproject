import { gql } from "apollo-boost";

export const GET_ONBOARDING_USER_DATA = gql`
  query getOnbordingUser($userId: ID) {
    onboarding(id: $userId) {
      data {
        id
        attributes {
          hr_approval
          marketing_approval
          first_name
          last_name
          title
          email
          mobile_no
          designation
          manager
          past_detail
          life_style
          location
          info
          education
          profile {
            data {
              attributes {
                url
                name
              }
            }
          }
          wish_text
        }
      }
    }
  }
`;
