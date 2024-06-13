import { gql } from "apollo-boost";

export const GET_TND_LIST_DATA = gql`
  query getTndList(
    $pageNum: Int
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    intelliTnds(
      filters: {
        hr_approval: { eq: $hrApproval }
        marketing_approval: { eq: $marketingApproval }
      }
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
          hr_approval
          marketing_approval
          designation
          first_name
          last_name
          createdAt
        }
      }
    }
  }
`;
