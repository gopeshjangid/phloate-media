import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams, Link } from "react-router-dom";

import { resetPassword } from "../../../../redux/modules/Auth/authApi";
import SubmitButton from "../../components/SubmitButton";
import Notification from "../../../../components/Notification/Notification";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .matches(
      /^.*[a-zA-Z]+.*$/,
      "Your password must include at least one letter!"
    )
    .matches(
      /^.*[a-z]+.*$/,
      "Your password must include both upper and lower case letters!"
    )
    .matches(
      /^.*[A-Z]+.*$/,
      "Your password must include both upper and lower case letters!"
    )
    .matches(
      new RegExp("^.*[@$!%^(){}\\[\\]:;><,./~_+=|*#?=&].*$"),
      "Your password must contain at least one special character!"
    )
    .required("Password is required!"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required!")
    .oneOf([yup.ref("password"), null], "Passwords must match!"),
});

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPassword() {
  const { token } = useParams();

  const [isApiSuccess, setIsApiSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values, actions) => {
    setLoading(true);
    setError("");
    try {
      await resetPassword(values.password, token);
      setIsApiSuccess(true);
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      {error && <Notification type="error" message={error} />}
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Row as={Col} md="6" className="formbox">
              <div className="join_us_title">Recover Password</div>
              {isApiSuccess ? (
                <div>
                  Your password is successfully updated. Please
                  <Link to="/auth/login" />
                  continue.
                </div>
              ) : (
                <>
                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      value={values.password}
                      className="form_input notvalid"
                      name="password"
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12" controlId="validationCustom01">
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      className="form_input notvalid"
                      name="confirmPassword"
                      onChange={handleChange}
                      isValid={
                        touched.confirmPassword && !errors.confirmPassword
                      }
                      isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="12">
                    <Row>
                      <Col className="align-self-center text-center">
                        <SubmitButton isLoading={loading} buttonText="SUBMIT" />
                      </Col>
                    </Row>
                  </Form.Group>
                </>
              )}
            </Form.Row>
          </Form>
        )}
      </Formik>{" "}
    </div>
  );
}
