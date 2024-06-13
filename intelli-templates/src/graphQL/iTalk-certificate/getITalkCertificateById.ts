import { gql } from "apollo-boost";

export const GET_ITALK_CERTIFICATE_BY_ID = gql`
  query getItlkCertificateById($userId: ID) {
    italkCertificate(id: $userId) {
      data {
        id
        attributes {
          first_name
          last_name
          certificate_name
          certificate_date
        }
      }
    }
  }
`;
