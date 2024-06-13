import { gql } from "apollo-boost";

export const UPDATE_ITALK_CERTIFICATE_USER = gql`
  mutation updateItalkCertificate(
    $userId: ID!
    $first_name: String
    $last_name: String
    $certificate_name: String
    $certificate_date: String
  ) {
    updateItalkCertificate(
      id: $userId
      data: {
        first_name: $first_name
        last_name: $last_name
        certificate_name: $certificate_name
        certificate_date: $certificate_date
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
