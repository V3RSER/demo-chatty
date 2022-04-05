import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Nav, Navbar } from "reactstrap";
import { logOut } from "../helpers/auth";

const Header = (authenticated) => {
  let navigate = useNavigate();
  
  return (
    <Navbar color="dark" dark expand light>
      <Nav className="me-auto" navbar>
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <NavLink className="navbar-brand" to="/chat">
          Chat
        </NavLink>
      </Nav>
      {authenticated.authenticated ? (
        <Button onClick={() => logOut()} className="mx-1">
          Log out
        </Button>
      ) : (
        <>
          <Button onClick={() => navigate("/login")} className="mx-1">
            Log in
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="mx-1"
            color="light"
          >
            Sing up
          </Button>
        </>
      )}
    </Navbar>
  );
};

export default Header;
