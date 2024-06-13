import { gql } from "apollo-boost";

export const GET_INTELLI_IBUDDY_LIST = gql`
  query getIntelliIbuddyList(
    $pageNum: Int
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    intelliBuddies(
      filters: {
        marketing_approval: { eq: $marketingApproval }
        hr_approval: { eq: $hrApproval }
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
          joinee_first_name
          joinee_last_name
          createdAt
        }
      }
    }
  }
`;
