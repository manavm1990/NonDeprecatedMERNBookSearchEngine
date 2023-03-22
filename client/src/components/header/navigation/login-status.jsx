import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export default function LoginStatus({
  currentUser,
  handleShowLogin,
  handleLogout,
}) {
  return currentUser ? (
    <>
      Signed in as: {currentUser.username}
      <Button variant="danger" className="ms-2" onClick={handleLogout}>
        Logout
      </Button>
    </>
  ) : (
    <Button onClick={handleShowLogin}>Login/Register</Button>
  );
}

LoginStatus.propTypes = {
  currentUser: PropTypes.object,
  handleShowLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
