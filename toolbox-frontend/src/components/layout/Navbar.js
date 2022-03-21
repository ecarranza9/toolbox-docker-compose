import React from "react";
import { Container, Navbar } from "react-bootstrap";

const NavBar = () => (
  <div data-testid="navbar">
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>React Test APP</Navbar.Brand>
      </Container>
    </Navbar>
  </div>
);

export default NavBar;
