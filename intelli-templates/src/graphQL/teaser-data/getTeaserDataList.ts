import { gql } from "apollo-boost";

export const GET_TEASER_DATA_LIST = gql`
  query getIntelliTeaserList($pageNum: Int) {
    intelliTeasers(
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
          background_image {
            data {
              attributes {
                url
                name
              }
            }
          }
          header_logo {
            data {
              attributes {
                url
                name
              }
            }
          }
          section
          salutation
          signature
          createdAt
        }
      }
    }
  }
`;
