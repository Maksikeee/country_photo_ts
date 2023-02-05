import { gql } from "@apollo/client";

export const LIST_COUNTRIES = gql`
    {
      continents {
        name
        code
        countries {
          name
          code
        }
      }
    }
  `;