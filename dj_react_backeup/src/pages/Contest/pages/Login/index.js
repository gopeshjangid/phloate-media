import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

import * as actions from "../../../../redux/modules/Auth/authActions";
import Notification from "../../../../components/Notification/Notification";
import SubmitButton from "../../components/SubmitButton";

export default function Login() {
  const dispatch = useDispatch();

  const { isLoading, loginError } = useSelector(
    ({ auth }) => auth,
    shallowEqual
  );

  console.log({ isLoading, loginError });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(
      actions.login(
        event.target.elements.email.value,
        event.target.elements.password.value
      )
    );
  };

  return (
    <div className="container">
      <Form onSubmit={onSubmit} autoComplete="off">
        <Form.Row as={Col} md="6" className="formbox">
          {loginError && <Notification type="error" message={loginError} />}
          <div className="join_us_title">LOGIN</div>
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Control
              type="email"
              placeholder="Email"
              defaultValue=""
              className="form_input notvalid"
              name="email"
              required
            />
          </Form.Group>

          <Form.Group as={Col} md="12" controlId="validationCustom02">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue=""
              className="form_input notvalid"
              name="password"
              required
            />
          </Form.Group>
          <Form.Group as={Col} md="12">
            <Row>
              <Col className="col-auto mr-auto">
                <Link style={{ color: "white" }} to={"/contest/auth/signup"}>
                  {" "}
                  Create an account?
                </Link>
              </Col>
              <Col className="col-auto">
                <Link
                  style={{ color: "white" }}
                  to={"/contest/auth/forgotPassword"}
                >
                  {" "}
                  Forgot Password?
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="align-self-center text-center">
                <SubmitButton isLoading={isLoading} buttonText="Login" />
              </Col>
            </Row>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
}
