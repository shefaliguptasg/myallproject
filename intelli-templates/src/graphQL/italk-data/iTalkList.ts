import { gql } from "apollo-boost";

export const GET_ITALK_LIST_DATA = gql`
  query getIntelliItalkList(
    $pageNum: Int
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    intelliTalks(
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
          designation
          first_name
          last_name
          createdAt
        }
      }
    }
  }
`;
