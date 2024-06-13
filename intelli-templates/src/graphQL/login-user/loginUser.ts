import { gql } from "apollo-boost";
export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    signUps(filters: { email: { eq: $email }, password: { eq: $password } }) {
      data {
        attributes {
          first_name
          role
        }
      }
    }
  }
`;
