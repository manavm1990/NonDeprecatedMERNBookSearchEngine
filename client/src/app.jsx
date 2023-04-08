import { useQuery } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { index } from "./api";
import BooksContainer from "./components/books-container/books-container";
import Header from "./components/header/header";
import AuthContext from "./context";
import { CURRENT_USER } from "./schema/queries";
import { normalizeBook } from "./utils";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function App() {
  const [foundBooks, setFoundBooks] = useState([]);
  const [isSavedOnlyMode, setIsSavedOnlyMode] = useState(false);

  const { data } = useQuery(CURRENT_USER);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.search.value;

    // GoogleBooks API puts the results in 'items'
    // Rename this to 📚
    const { items: books } = await index(query);

    setFoundBooks(books.map(normalizeBook));
  };

  return (
    <AuthContext.Provider value={data?.currentUser}>
      <Header
        disableSearch={isSavedOnlyMode}
        handleSearch={handleSearch}
        handleSwitch={() => {
          setIsSavedOnlyMode((prev) => !prev);
        }}
      />
      <Container className="my-4" as="main">
        <h2 className="my-4">
          📚{" "}
          {data?.currentUser
            ? `${data.currentUser.username} Has ${data.currentUser.books.length} Saved Books`
            : "Login or Register to Start Saving 📚"}
        </h2>
        {!isSavedOnlyMode && foundBooks.length ? (
          <Elements stripe={stripePromise}>
            <BooksContainer foundBooks={foundBooks} />
          </Elements>
        ) : null}
        {isSavedOnlyMode && data?.currentUser?.books.length ? (
          <BooksContainer foundBooks={data.currentUser.books} />
        ) : null}
      </Container>
    </AuthContext.Provider>
  );
}
