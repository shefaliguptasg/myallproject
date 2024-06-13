import { gql } from "apollo-boost";

export const CREATE_USER_STATUS = gql`
  mutation createUser(
    $firstName: String
    $lastName: String
    $password: String
    $email: String
    $role: String
    $publishedAt: DateTime
  ) {
    createSignUp(
      data: {
        first_name: $firstName
        last_name: $lastName
        password: $password
        email: $email
        role: $role
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
