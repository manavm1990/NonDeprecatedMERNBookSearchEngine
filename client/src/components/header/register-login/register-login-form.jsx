import { LOGIN } from "@/schema/type-defs";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function RegisterLoginForm({ isRegistering }) {
  const [login] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      window.location.assign("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    login({ variables: { username, password } });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {isRegistering && (
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
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
};
