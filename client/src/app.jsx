import { useQuery } from "@apollo/client";
import { useReducer, useState } from "react";
import Container from "react-bootstrap/Container";
import { indexGoogleBooks } from "./api";
import BooksContainer from "./components/books-container/books-container";
import Header from "./components/header/header";
import AuthContext from "./contexts/auth-context";
import CartContext, { cartReducer } from "./contexts/cart-context";
import { CURRENT_USER } from "./schema/queries";
import { normalizeBook } from "./utils";

export default function App() {
  const [foundBooks, setFoundBooks] = useState([]);
  const [isSavedOnlyMode, setIsSavedOnlyMode] = useState(false);

  const { data } = useQuery(CURRENT_USER);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.search.value;

    // GoogleBooks API puts the results in 'items'
    // Rename this to 📚
    const { items: books } = await indexGoogleBooks(query);

    setFoundBooks(books.map(normalizeBook));
  };

  return (
    <AuthContext.Provider value={data?.currentUser}>
      {/* useContext-useReducer Pattern
      https://youtu.be/0lRBj54zuK0
      */}
      <CartContext.Provider
        value={useReducer(
          cartReducer,
          JSON.parse(localStorage.getItem("cart")) || []
        )}
      >
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
            <BooksContainer foundBooks={foundBooks} />
          ) : null}
          {isSavedOnlyMode && data?.currentUser?.books.length ? (
            <BooksContainer foundBooks={data.currentUser.books} />
          ) : null}
        </Container>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
