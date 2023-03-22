import AuthContext from "@/context";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/esm/Stack";
import RegisterLogin from "./register-login/register-login";
import SearchBar from "./search-bar";

export default function Header({ handleSearch }) {
  const [isShowingRegisterLogin, setIsShowingRegisterLogin] = useState(false);
  const currentUser = useContext(AuthContext);

  return (
    <Container fluid as="header" className="bg-dark pt-5 pb-3 px-5">
      <Stack direction="horizontal">
        <h1 className="text-white">Search For 📚</h1>
        {currentUser ? (
          <Button
            variant="danger"
            className="ms-auto"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.assign("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => setIsShowingRegisterLogin(true)}
            className="ms-auto"
          >
            Login/Register
          </Button>
        )}
      </Stack>
      <SearchBar handleSubmit={handleSearch} />

      <RegisterLogin
        isShowing={isShowingRegisterLogin}
        hide={() => {
          setIsShowingRegisterLogin(false);
        }}
      />
    </Container>
  );
}

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};
