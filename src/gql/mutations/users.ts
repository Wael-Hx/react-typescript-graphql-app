import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      id
      username
    }
  }
`;
