import React from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>
          <Nav
            activeKey="/#/contest/submitSongs"
            onSelect={(selectedKey) => history.push(selectedKey)}
            className="justify-content-center"
          >
            <Nav.Item>
              <Nav.Link eventKey="/contest/submitSongs">Submit Songs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/contest/overview">Overview</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/contest/faq">FAQs</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="/contest/termsAndConditions">
                Terms & Conditions
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}
