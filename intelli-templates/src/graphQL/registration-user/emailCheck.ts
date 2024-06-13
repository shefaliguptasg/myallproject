import { gql } from "apollo-boost";

export const CHECK_EMAIL = gql`
  query CheckEmail($email: String!) {
    signUps(filters: { email: { eq: $email } }) {
      data {
        id
        attributes {
          first_name
        }
      }
    }
  }
`;
