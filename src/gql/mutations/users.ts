import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      credentials: { username: $username, email: $email, password: $password }
    ) {
      id
      username
      email
      createdAt
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(credentials: { email: $email, password: $password }) {
      id
      username
      email
      createdAt
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
export const CREATE_PROFILE = gql`
  mutation CreateProfile($bio: String, $avatar: String) {
    createProfile(userProfile: { bio: $bio, avatar: $avatar }) {
      user {
        username
        createdAt
        updatedAt
      }
      bio
      avatar
      saved {
        id
        title
        images
      }
      posts {
        id
        title
        images
      }
      likes {
        id
        title
        images
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation CreateProfile($bio: String, $avatar: String) {
    createProfile(userProfile: { bio: $bio, avatar: $avatar }) {
      user {
        username
        updatedAt
      }
      bio
      avatar
    }
  }
`;
