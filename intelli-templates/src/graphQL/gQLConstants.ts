import { gql } from "apollo-boost";
import { getBrandingData } from "./queries";

//Queries
export const Queries = {
  GET_BRANDING_DATA: gql`
    ${getBrandingData}
  `,
};
