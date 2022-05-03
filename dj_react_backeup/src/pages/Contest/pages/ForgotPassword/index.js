import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";

import SubmitButton from "../../components/SubmitButton";
import { forgotPassword } from "../../../../redux/modules/Auth/authApi";

export default function ForgotPassword() {
  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    setLoading(true);
    console.log(event.target.elements.email.value);
    event.preventDefault();
    await forgotPassword(event.target.elements.email.value);
    setIsApiSuccess(true);
    setLoading(false);
  };

  return (
    <div className="container">
      <Form onSubmit={onSubmit} autoComplete="off">
        <Form.Row as={Col} md="6" className="formbox">
          <div className="join_us_title">Recover Password</div>
          {console.log(isApiSuccess) || isApiSuccess ? (
            <div>
              If you are registered with us an email with further instructions
              will be sent to your email address. Thank You.
            </div>
          ) : (
            <>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="email"
                  placeholder="Registered email address"
                  defaultValue=""
                  className="form_input notvalid"
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} md="12">
                <Row>
                  <Col className="align-self-center text-center">
                    <SubmitButton buttonText="SUBMIT" isLoading={loading} />
                  </Col>
                </Row>
              </Form.Group>
            </>
          )}
        </Form.Row>
      </Form>
    </div>
  );
}
