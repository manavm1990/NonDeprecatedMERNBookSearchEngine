import cartContext from "@/contexts/cart-context";
import { useContext } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ListGroup from "react-bootstrap/ListGroup";

export default function CartDetails() {
  const [state, dispatch] = useContext(cartContext);

  return (
    <div>
      <h2>📚</h2>
      <ListGroup>
        {state.map((book) => (
          <div key={book.bookId} className="d-flex justify-content-between">
            <ListGroup.Item>
              <strong>{book.title}</strong>&nbsp;-&nbsp;{book.quantity}
              &nbsp;@&nbsp;$
              {book.price} ={" "}
              <strong className="text-info">
                ${book.quantity * book.price}
              </strong>
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
        ))}
      </ListGroup>

      <p className="h4 text-info-emphasis text-end mt-4">
        Grand Total: $
        {state.reduce((total, currBook) => {
          return total + currBook.quantity * currBook.price;
        }, 0)}
      </p>

      <Button variant="success" className="w-100 mt-4">
        Checkout
      </Button>
    </div>
  );
}
