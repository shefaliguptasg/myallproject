import { gql } from "apollo-boost";
export const UPDATE_ONBOARDING_USER = gql`
  mutation updateTemplateUser(
    $userId: ID!
    $title: String
    $first_name: String
    $last_name: String
    $email: String
    $mobile_no: String
    $manager: String
    $designation: String
    $location: String
    $info: String
    $education: String
    $past_detail: String
    $hr_approval: Boolean
    $wish_text: String
    $marketing_approval: Boolean
    $life_style: String
  ) {
    updateOnboarding(
      id: $userId
      data: {
        title: $title
        first_name: $first_name
        last_name: $last_name
        email: $email
        mobile_no: $mobile_no
        designation: $designation
        manager: $manager
        location: $location
        info: $info
        education: $education
        past_detail: $past_detail
        hr_approval: $hr_approval
        wish_text: $wish_text
        marketing_approval: $marketing_approval
        life_style: $life_style
      }
    ) {
      data {
        id
        attributes {
          first_name
        }
      }
    }
  }
`;
