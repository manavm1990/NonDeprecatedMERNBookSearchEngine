import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RegisterLoginForm from "./register-login-form";

export default function RegisterLogin({ isShowing, hide }) {
  return (
    <Modal
      show={isShowing}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterLoginForm />
      </Modal.Body>
      <Modal.Footer>
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
