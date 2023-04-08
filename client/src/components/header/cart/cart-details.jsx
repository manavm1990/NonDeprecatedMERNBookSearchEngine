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
              <strong className="text-primary">
                ${book.quantity * book.price}
              </strong>
            </ListGroup.Item>

            <ButtonGroup aria-label="Add/Remove 📚">
              <Button
                variant="success"
                onClick={() => {
                  dispatch({ type: "ADD_BOOK", payload: book });
                }}
              >
                +
              </Button>
              <Button
                variant="danger"
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
    </div>
  );
}
