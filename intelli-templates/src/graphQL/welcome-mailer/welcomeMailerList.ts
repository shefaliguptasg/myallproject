import { gql } from "apollo-boost";

export const GET_MAILER_LIST_DATA = gql`
  query getWelcomeMailerList($clientName: String, $pageNum: Int) {
    welcomeMailers(
      filters: { title: { eq: $clientName } }
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
          welcome_mailer_data {
            emp_name
            emp_designation
          }
        }
      }
    }
  }
`;
