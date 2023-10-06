import { React } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const Navigationbar = ({ money, setMoney }) => {
  return (
    <div>
      <Navbar className="navBar" expand="sm">
        <Container style={{ display: "flex", justifyContent: "flex-end" }}>
          <Nav>
            <div>${money}</div>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
export default Navigationbar;
