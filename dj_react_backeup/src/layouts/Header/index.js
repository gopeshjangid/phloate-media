import React from "react";
import "./style.scss";
import propTypes from "prop-types";

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";

export default function Header() {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className="align-center nav-item-list">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>

                  <Nav.Link
                    target="_blank"
                    href="#"
                  >
                    ABOUT PHLOTE
                  </Nav.Link>
                  <Link to="/#" className="nav-link">
                    PHLOTE.RADIO
                  </Link>
                  {isAuthorized && (
                    <Link to="/contest/logout" className="nav-link">
                      LOGOUT
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  postUrl: propTypes.string,
  isHome: propTypes.bool,
};
