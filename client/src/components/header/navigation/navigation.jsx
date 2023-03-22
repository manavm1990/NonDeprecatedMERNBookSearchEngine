import { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import LoginStatus from "./login-status";
import RegisterLogin from "./register-login/register-login";

export default function Navigation() {
  const [isShowingRegisterLogin, setIsShowingRegisterLogin] = useState(false);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <h1 className="text-white">Search For 📚</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="nav" />
          <Navbar.Collapse className="justify-content-end" id="nav">
            <Navbar.Text className="text-white">
              <LoginStatus
                handleShowLogin={() => setIsShowingRegisterLogin(true)}
                handleLogout={() => {
                  localStorage.removeItem("token");
                  window.location.assign("/");
                }}
              />
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <RegisterLogin
        isShowing={isShowingRegisterLogin}
        hide={() => {
          setIsShowingRegisterLogin(false);
        }}
      />
    </>
  );
}
