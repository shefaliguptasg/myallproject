import { gql } from "apollo-boost";
export const UPLOAD_PROFILE_IMAGE = gql`
  mutation uploadProfileImage(
    $refId: ID
    $ref: String
    $field: String
    $file: Upload!
  ) {
    upload(refId: $refId, ref: $ref, field: $field, file: $file) {
      data {
        attributes {
          name
          url
        }
      }
    }
  }
`;
