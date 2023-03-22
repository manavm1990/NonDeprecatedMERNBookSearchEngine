import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function BookCard({ book, isSaved, currentUser, handleClick }) {
  return (
    <Card>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="fw-bold">Authors:</ListGroup.Item>
        {book.authors?.map((author) => (
          <ListGroup.Item key={author}>{author}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <Card.Link href={book.link} target="_blank" rel="noopener">
          View Details on Google 📚
        </Card.Link>
        {currentUser && (
          <Button
            variant={isSaved ? "warning" : "secondary"}
            className="float-end"
            onClick={() => handleClick(isSaved ? "REMOVE_BOOK" : "SAVE_BOOK")}
          >
            {isSaved ? "Remove 🔥 from 📚" : "Save to 📚"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

BookCard.defaultProps = {
  isSaved: false,
};

BookCard.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    bookId: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  isSaved: PropTypes.bool,

  // Just using this for a Boolean check
  currentUser: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
};
