import { gql } from "apollo-boost";
export const CREATE_TND_USER = gql`
  mutation createIntelliTnd(
    $title: String
    $first_name: String
    $last_name: String
    $designation: String
    $td_section: JSON
    $marketing_approval: Boolean
    $hr_approval: Boolean
    $publishedAt: DateTime
  ) {
    createIntelliTnd(
      data: {
        title: $title
        first_name: $first_name
        last_name: $last_name
        designation: $designation
        td_section: $td_section
        marketing_approval: $marketing_approval
        hr_approval: $hr_approval
        publishedAt: $publishedAt
      }
    ) {
      data {
        id
        attributes {
          title
          first_name
          last_name
          designation
        }
      }
    }
  }
`;
