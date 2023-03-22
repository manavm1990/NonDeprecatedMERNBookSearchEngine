import { useState } from "react";
import { index } from "./api";
import Header from "./components/header/header";

export default function App() {
  const [foundBooks, setFoundBooks] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const query = event.target.search.value;

    // GoogleBooks API puts the results in 'items'
    const { items } = await index(query);
    setFoundBooks(items);
  };

  return <Header handleSearch={handleSearch} />;
  // TODO: Pass 'foundBooks' to Card component
}
