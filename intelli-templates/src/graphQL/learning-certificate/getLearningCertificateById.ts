import { gql } from "apollo-boost";

export const GET_LEARNING_CERTIFICATE_BY_ID = gql`
  query getLearningCertificateById($userId: ID) {
    learningCertificate(id: $userId) {
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
