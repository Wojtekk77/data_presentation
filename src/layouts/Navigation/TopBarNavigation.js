import React from "react";
import { connect } from "react-redux";
import { authAction } from "../../acions/authActions";
import {
  Col,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

export const TopBarNavigation = ({ isLoggedIn, auth }) => {
  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Brand href="#home">Zadanie rekrutacyjne React</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-auto">
          <Nav.Link href="#charts">Wykresy</Nav.Link>
          <Nav.Link href="#table">Tabela</Nav.Link>
        </Nav>
        <Form inline>
          <Button variant="outline-success" onClick={() => auth()}>
            {isLoggedIn ? "Wyloguj" : "Zaloguj"}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {
    auth: () => dispatch(authAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBarNavigation);
