import cartContext from "@/contexts/cart-context";
import PropTypes from "prop-types";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";

export default function Item({ book }) {
  const [_, dispatch] = useContext(cartContext);

  return (
    <div key={book.bookId} className="d-flex justify-content-between">
      <ListGroup.Item>
        <strong>{book.title}</strong>&nbsp;-&nbsp;{book.quantity}
        &nbsp;@&nbsp;$
        {book.price} ={" "}
        <strong className="text-info">${book.quantity * book.price}</strong>
      </ListGroup.Item>

      <ButtonGroup aria-label="Add/Remove 📚">
        <Button
          variant="primary"
          onClick={() => {
            dispatch({ type: "ADD_BOOK", payload: book });
          }}
        >
          +
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            dispatch({ type: "REMOVE_BOOK", payload: book });
          }}
        >
          -
        </Button>
      </ButtonGroup>
    </div>
  );
}

Item.propTypes = {
  book: PropTypes.shape({
    authors: PropTypes.arrayOf(PropTypes.string),
    bookId: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
};
