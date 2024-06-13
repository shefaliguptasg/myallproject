import { gql } from "apollo-boost";

export const GET_ILEAP_LIST_DATA = gql`
  query GetIleapData($pageNum: Int) {
    intelliILeaps(
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
          header_text
          first_paragraph
          second_paragraph
          topics
          createdAt
        }
      }
    }
  }
`;
