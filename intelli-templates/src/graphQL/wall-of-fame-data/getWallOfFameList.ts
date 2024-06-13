import { gql } from "apollo-boost";

export const GET_WALL_OF_FAME_LIST = gql`
  query GetWallOfFameData($pageNum: Int) {
    intelliWofs(sort: "id:desc", pagination: { page: $pageNum, pageSize: 10 }) {
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
          quarter_year
          createdAt
        }
      }
    }
  }
`;
