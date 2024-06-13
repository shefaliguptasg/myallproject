import { gql } from "apollo-boost";

export const UPDATE_APPROVAL_STATUS = gql`
  mutation updateApprovalStatus(
    $userId: ID!
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    updateOnboarding(
      id: $userId
      data: { marketing_approval: $marketingApproval, hr_approval: $hrApproval }
    ) {
      data {
        attributes {
          hr_approval
          marketing_approval
          first_name
          last_name
        }
      }
    }
  }
`;
