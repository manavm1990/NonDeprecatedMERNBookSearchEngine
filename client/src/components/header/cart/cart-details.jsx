import cartContext from "@/contexts/cart-context";
import { useContext } from "react";
import ListGroup from "react-bootstrap/ListGroup";

export default function CartDetails() {
  const [state, dispatch] = useContext(cartContext);

  return (
    <div>
      <h2>📚</h2>
      <ListGroup>
        {state.map((book) => (
          <ListGroup.Item key={book.bookId}>
            <strong>{book.title}</strong>&nbsp;-&nbsp;{book.quantity}
            &nbsp;@&nbsp;$
            {book.price} ={" "}
            <strong className="text-primary">
              ${book.quantity * book.price}
            </strong>
          </ListGroup.Item>

          // TODO: Add buttons to add and remove books from the cart.
        ))}
      </ListGroup>
    </div>
  );
}
