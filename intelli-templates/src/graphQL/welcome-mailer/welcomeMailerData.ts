import { gql } from "apollo-boost";

export const GET_MAILER_USER_DATA = gql`
  query getWelcomeMailerUser($userId: ID) {
    welcomeMailer(id: $userId) {
      data {
        attributes {
          welcome_mailer_data {
            emp_name
            emp_designation
            emp_image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            emp_hobby_img {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            section_one
            section_two
            section_three
            section_four
            section_five
            social_link
          }
          validation {
            hr_approval
            marketing_approval
          }
        }
      }
    }
  }
`;
