import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      books {
        title
        description
        link
        image
        bookId
        authors
      }
    }
  }
`;
