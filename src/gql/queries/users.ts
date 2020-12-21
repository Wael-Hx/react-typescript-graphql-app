import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query Me {
    me {
      id
      username
      email
      createdAt
    }
  }
`;
