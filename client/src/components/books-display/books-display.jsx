import AuthContext from "@/context";
import { REMOVE_BOOK, SAVE_BOOK } from "@/schema/mutations";
import { CURRENT_USER } from "@/schema/queries";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BookCard from "./book-card";

export default function BooksContainer({ foundBooks }) {
  const currentUser = useContext(AuthContext);

  const [saveBook] = useMutation(SAVE_BOOK, {
    // When the mutation is successful, update the cache
    update(cache, { data: { saveBook } }) {
      // Read the data from the cache for this query.
      const { currentUser } = cache.readQuery({ query: CURRENT_USER });

      // Write the data back to the cache.
      cache.writeQuery({
        query: CURRENT_USER,
        data: {
          currentUser: {
            ...currentUser,
            books: [...currentUser.books, saveBook],
          },
        },
      });
    },
  });

  const [removeBook] = useMutation(REMOVE_BOOK, {
    // When the mutation is successful, update the cache
    update(cache, { data: { removeBook } }) {
      // Read the data from the cache for this query.
      const { currentUser } = cache.readQuery({ query: CURRENT_USER });

      // Write the data back to the cache.
      cache.writeQuery({
        query: CURRENT_USER,
        data: {
          currentUser: {
            ...currentUser,
            books: currentUser.books.filter(
              (book) => book.bookId !== removeBook.bookId
            ),
          },
        },
      });
    },
  });

  return (
    <Row xs={1} md={3} className="g-4">
      {foundBooks.map((book) => (
        <Col key={book.bookId}>
          <BookCard
            book={book}
            // If this `book.bookId` is in `currentUser.books`......
            isSaved={Boolean(
              currentUser?.books.find(
                (currentUserBook) => currentUserBook.bookId === book.bookId
              )
            )}
            currentUser={currentUser}
            handleClick={(action) => {
              switch (action) {
                case "SAVE_BOOK":
                  saveBook({
                    variables: {
                      book,
                    },
                  });
                  break;
                case "REMOVE_BOOK":
                  removeBook({
                    variables: {
                      bookId: book.bookId,
                    },
                  });
                  break;
                default:
                  // TODO: Add Error toast?
                  throw new Error("Invalid action");
              }
            }}
          />
        </Col>
      ))}
    </Row>
  );
}

BooksContainer.propTypes = {
  foundBooks: PropTypes.arrayOf(
    PropTypes.shape({
      authors: PropTypes.arrayOf(PropTypes.string),
      bookId: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
