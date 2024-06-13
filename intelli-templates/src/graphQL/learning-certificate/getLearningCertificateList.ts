import { gql } from "apollo-boost";

export const GET_LEARNING_CERTIFICATE_LIST = gql`
  query getLearningCertificates($pageNum: Int) {
    learningCertificates(
      sort: "id:desc"
      pagination: { page: $pageNum, pageSize: 10 }
    ) {
      meta {
        pagination {
          total
          pageCount
          page
          pageSize
        }
      }
      data {
        id
        attributes {
          first_name
          last_name
          certificate_name
          certificate_date
          createdAt
        }
      }
    }
  }
`;
