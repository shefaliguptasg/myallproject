import { gql } from "apollo-boost";

export const GET_ONBOARDING_LIST_DATA = gql`
  query getOnbordingUserList(
    $pageNum: Int
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    onboardin(
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
          title
          first_name
          last_name
          designation
        }
      }
    }
  }
`;
