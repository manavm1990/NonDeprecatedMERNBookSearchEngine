import AuthContext from "@/context";
import PropTypes from "prop-types";
import { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BookCard from "./book-card";

export default function BooksContainer({ foundBooks }) {
  const currentUser = useContext(AuthContext);

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
          />
        </Col>
      ))}
    </Row>
  );
}

BooksContainer.propTypes = {
  // 'normalizeBook' returns a 📖
  foundBooks: PropTypes.arrayOf(
    PropTypes.exact({
      authors: PropTypes.arrayOf(PropTypes.string),
      bookId: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      link: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};
