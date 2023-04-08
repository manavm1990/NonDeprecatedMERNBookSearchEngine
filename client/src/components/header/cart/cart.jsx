import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function Cart({ isShowing, hide }) {
  return (
    <Modal
      show={isShowing}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>🛒 Your cart is empty.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
