import { gql } from "apollo-boost";

export const GET_LEARNING_LIST = gql`
  query getLearningData($pageNum: Int) {
    learningLeagues(
      sort: "id:desc"
      pagination: { page: $pageNum, pageSize: 10 }
    ) {
      meta {
        pagination {
          pageCount
          total
          page
          pageSize
        }
      }
      data {
        id
        attributes {
          user_data
          section_data
          createdAt
        }
      }
    }
  }
`;
