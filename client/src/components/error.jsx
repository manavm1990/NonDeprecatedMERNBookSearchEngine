import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";

export default function Error({ error }) {
  return (
    <Alert variant="danger" className="my-4">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error.message}</p>
      <p className="mb-0">{error.code}</p>
    </Alert>
  );
}

Error.defaultProps = {
  error: { message: "An unknown error occurred.", code: "UNKNOWN" },
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    code: PropTypes.string,
  }),
};
