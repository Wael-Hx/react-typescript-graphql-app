import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      username
      email
      createdAt
    }
  }
`;

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      user {
        username
        createdAt
        updatedAt
      }
      displayName
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

export const USER = gql`
  query User {
    loggedUser @client
  }
`;
