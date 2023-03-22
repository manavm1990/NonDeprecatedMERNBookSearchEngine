import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function RegisterLoginForm({
  isRegistering,
  register,
  login,
  handleFocus,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    if (isRegistering) {
      const email = form.elements.email.value;
      register({ variables: { user: { username, email, password } } });
    } else {
      login({ variables: { username, password } });
    }
  };

  return (
    <Form onSubmit={handleSubmit} onFocus={handleFocus}>
      {isRegistering && (
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required={isRegistering} />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" required />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="success" type="submit">
          {isRegistering ? "Register" : "Login"}
        </Button>
      </div>
    </Form>
  );
}

RegisterLoginForm.defaultProps = {
  isRegistering: false,
};

RegisterLoginForm.propTypes = {
  isRegistering: PropTypes.bool,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
