import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BookCard from "./book-card";

export default function BooksContainer({ foundBooks }) {
  return (
    <Row xs={1} md={3} className="g-4">
      {foundBooks.map((book) => (
        <Col key={book.bookId}>
          <BookCard book={book} />
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
