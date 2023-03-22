import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RegisterLoginForm from "./register-login-form";

export default function RegisterLogin({ isShowing, hide }) {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Modal
      show={isShowing}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          {isRegistering
            ? "Register a New Account"
            : "Login 2 Existing Account"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterLoginForm isRegistering={isRegistering} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          type="button"
          className="ms-2"
          onClick={() => {
            setIsRegistering((prev) => !prev);
          }}
        >
          {isRegistering ? "Need to Login❔" : "Need to Register❔"}
        </Button>
        <Button variant="warning" onClick={hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RegisterLogin.defaultProps = {
  isShowing: false,
};

RegisterLogin.propTypes = {
  isShowing: PropTypes.bool,
  hide: PropTypes.func.isRequired,
};
