import { useQuery } from "@apollo/client";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { index } from "./api";
import BooksDisplay from "./components/books-display/books-display";
import Header from "./components/header/header";
import AuthContext from "./context";
import { CURRENT_USER } from "./schema/type-defs";
import { normalizeBook } from "./utils";

export default function App() {
  const [foundBooks, setFoundBooks] = useState([]);

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
      <Header handleSearch={handleSearch} />
      <Container className="my-4" as="main">
        <h2 className="my-4">
          📚{" "}
          {data?.currentUser
            ? `${data.currentUser.username} Has ${data.currentUser.books.length} Saved Books`
            : "Login or Register to Start Saving 📚"}
        </h2>
        {foundBooks.length ? <BooksDisplay foundBooks={foundBooks} /> : null}
      </Container>
    </AuthContext.Provider>
  );
}
