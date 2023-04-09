import { getClientSecret } from "@/api";
import cartContext from "@/contexts/cart-context";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Checkout from "./checkout";
import Item from "./item";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CartDetails() {
  const [clientSecret, setClientSecret] = useState("");

  const [state] = useContext(cartContext);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const { clientSecret } = await getClientSecret(state);
    setClientSecret(clientSecret);
  };

  return (
    <div>
      <h2>📚</h2>
      <ListGroup>
        {state.map((book) => (
          <Item book={book} key={book.bookId} />
        ))}
      </ListGroup>

      <p className="h4 text-info-emphasis text-end mt-4">
        Grand Total: $
        {state.reduce((total, currBook) => {
          return total + currBook.quantity * currBook.price;
        }, 0)}
      </p>

      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
          stripe={stripePromise}
        >
          <Checkout />
        </Elements>
      )}

      {/* Hide this whenever 'Checkout' is there */}
      {!clientSecret && (
        <Button
          variant="success"
          className="w-100 mt-4"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      )}
    </div>
  );
}
