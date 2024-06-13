import { gql } from "apollo-boost";
export const RESET_PASSWORD = gql`
  mutation resetPassword($id: ID!, $password: String) {
    updateSignUp(id: $id, data: { password: $password }) {
      data {
        attributes {
          first_name
          password
        }
      }
    }
  }
`;
