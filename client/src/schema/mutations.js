import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation CreateUser($user: UserInput) {
    createUser(user: $user) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($book: BookInput!) {
    saveBook(book: $book) {
      bookId
      title
      userId
      authors
      description
      image
      link
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      userId
      title
      bookId
      authors
      description
      image
      link
    }
  }
`;
