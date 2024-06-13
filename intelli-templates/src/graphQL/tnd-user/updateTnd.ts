import { gql } from "apollo-boost";

export const UPDATE_TND_APPROVAL_STATUS = gql`
  mutation updateIntelliTnd(
    $tndUserId: ID!
    $marketingApproval: Boolean
    $hrApproval: Boolean
  ) {
    updateIntelliTnd(
      id: $tndUserId
      data: { marketing_approval: $marketingApproval, hr_approval: $hrApproval }
    ) {
      data {
        attributes {
          hr_approval
          marketing_approval
          first_name
        }
      }
    }
  }
`;
