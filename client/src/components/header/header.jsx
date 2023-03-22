import PropTypes from "prop-types";
import Navigation from "./navigation/navigation";
import SearchBar from "./search-bar";

export default function Header({ handleSearch }) {
  return (
    <header className="bg-dark pt-5 pb-3">
      <Navigation />
      <SearchBar handleSubmit={handleSearch} />
    </header>
  );
}

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
