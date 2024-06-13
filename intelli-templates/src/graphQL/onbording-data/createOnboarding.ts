import { gql } from "apollo-boost";
export const CREATE_ONBOARDING_USER = gql`
  mutation createOnboardingUser(
    $title: String
    $first_name: String
    $last_name: String
    $email: String
    $mobile_no: String
    $designation: String
    $manager: String
    $location: String
    $info: String
    $education: String
    $past_detail: String
    $life_style: String
    $wish_text: String
    $marketing_approval: Boolean
    $hr_approval: Boolean
    $publishedAt: DateTime
  ) {
    createOnboarding(
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
        life_style: $life_style
        wish_text: $wish_text
        marketing_approval: $marketing_approval
        hr_approval: $hr_approval
        publishedAt: $publishedAt
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
