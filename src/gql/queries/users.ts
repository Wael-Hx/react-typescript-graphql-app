import { gql } from "@apollo/client";
import { UserFragment } from "../fragments/UserFragment";

export const ME = gql`
  query Me {
    me {
      ...CurrentUser
    }
  }
  ${UserFragment}
`;

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
      id
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
      liked {
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

export interface PostDetails {
  id: string;
  title: string;
  images: string[];
}

export interface UserProfile {
  myProfile: {
    id: string;
    user: {
      username: string;
      createdAt: string;
      updatedAt: string;
    };
    displayName: string;
    avatar: string;
    bio: string;
    saved: PostDetails[];
    posts: PostDetails[];
    liked: PostDetails[];
  };
}
