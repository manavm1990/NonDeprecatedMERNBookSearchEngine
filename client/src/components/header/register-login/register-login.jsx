import Error from "@/components/error";
import { LOGIN, REGISTER } from "@/schema/mutations";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import RegisterLoginForm from "./register-login-form";

export default function RegisterLogin({ isShowing, hide }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [login, { client: loginClient, error: loginError, reset: loginReset }] =
    useMutation(LOGIN, {
      onCompleted(data) {
        localStorage.setItem("token", data.login.token);
        hide();
        loginClient.resetStore();
      },
    });

  const [
    register,
    { client: registerClient, error: registerError, reset: registerReset },
  ] = useMutation(REGISTER, {
    onCompleted(data) {
      localStorage.setItem("token", data.createUser.token);
      hide();
      registerClient.resetStore();
    },
  });

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
        <RegisterLoginForm
          isRegistering={isRegistering}
          login={login}
          register={register}
          handleFocus={() => {
            loginReset();
            registerReset();
          }}
        />
        {loginError && <Error error={loginError} />}
        {registerError && <Error error={registerError} />}
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
