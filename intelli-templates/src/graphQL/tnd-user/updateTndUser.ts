import { gql } from "apollo-boost";
export const UPDATE_TND_USER = gql`
  mutation updateIntelliTnd(
    $tndUserId: ID!
    $title: String
    $first_name: String
    $last_name: String
    $td_section: JSON
    $designation: String
    $hr_approval: Boolean
    $marketing_approval: Boolean
  ) {
    updateIntelliTnd(
      id: $tndUserId
      data: {
        title: $title
        first_name: $first_name
        last_name: $last_name
        td_section: $td_section
        designation: $designation
        hr_approval: $hr_approval
        marketing_approval: $marketing_approval
      }
    ) {
      data {
        id
        attributes {
          title
          first_name
          last_name
          designation
          hr_approval
          marketing_approval
        }
      }
    }
  }
`;
