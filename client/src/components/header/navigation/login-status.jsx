import AuthContext from "@/context";
import PropTypes from "prop-types";
import { useContext } from "react";
import Button from "react-bootstrap/Button";

export default function LoginStatus({ handleShowLogin, handleLogout }) {
  const currentUser = useContext(AuthContext);

  return currentUser ? (
    <Button variant="danger" className="ms-2" onClick={handleLogout}>
      Logout
    </Button>
  ) : (
    <Button onClick={handleShowLogin}>Login/Register</Button>
  );
}

LoginStatus.propTypes = {
  handleShowLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
