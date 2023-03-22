import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

export default function SearchBar({ disabled, handleSubmit }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={3} className="mb-3 col-md-2 mx-auto">
        <Form.Group controlId="search">
          <Form.Label>Search for a book</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a book title"
            disabled={disabled}
          />
        </Form.Group>
        <Button
          variant={disabled ? "light" : "info"}
          type="submit"
          disabled={disabled}
        >
          Search
        </Button>
      </Stack>
    </Form>
  );
}

SearchBar.defaultProps = {
  disabled: false,
};

SearchBar.propTypes = {
  disabled: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
};
