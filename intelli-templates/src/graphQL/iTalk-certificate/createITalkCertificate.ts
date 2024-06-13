import { gql } from "apollo-boost";

export const CREATE_ITALK_CERTIFICATE_USER = gql`
  mutation createItalkCertificate(
    $first_name: String
    $last_name: String
    $certificate_name: String
    $certificate_date: String
    $publishedAt: DateTime
  ) {
    createItalkCertificate(
      data: {
        first_name: $first_name
        last_name: $last_name
        certificate_name: $certificate_name
        certificate_date: $certificate_date
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
