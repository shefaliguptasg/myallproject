import { gql } from "apollo-boost";

export const GET_TEASER_DATA_BY_ID = gql`
  query getTeaserDataById($teaserId: ID) {
    intelliTeaser(id: $teaserId) {
      data {
        id
        attributes {
          salutation
          header_text
          background_image {
            data {
              attributes {
                url
                name
              }
            }
          }
          header_logo {
            data {
              attributes {
                url
                name
              }
            }
          }
          section
          signature
        }
      }
    }
  }
`;
