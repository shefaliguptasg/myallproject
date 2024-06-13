import { gql } from "apollo-boost";

export const GET_ITALK_CERTIFICATE_LIST = gql`
  query getItlkCertificateList($pageNum: Int) {
    italkCertificates(
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
