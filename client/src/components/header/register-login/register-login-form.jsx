import { LOGIN } from "@/schema/type-defs";
import { useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function RegisterLoginForm() {
  const [login] = useMutation(LOGIN, {
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      window.location.assign("/");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const username = form.elements.email.value;
    const password = form.elements.password.value;

    login({ variables: { username, password } });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>

      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
}
