import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

import * as authActions from "../../../../redux/modules/Auth/authActions";
import Notification from "../../../../components/Notification/Notification";
import SubmitButton from "../../components/SubmitButton";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required!"),
  lastName: yup.string().required("Last name is required!"),
  email: yup.string().email().required("Email is required!"),
  phone: yup.string(),
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
  agreementTerms1: yup.bool(),
  agreementTerms2: yup.bool(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agreement2: false,
  agreement3: false,
};

export default function SignUp() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { isRegistrationSuccess, registrationerror, isLoading } = useSelector(
    ({ auth }) => auth,
    shallowEqual
  );

  const registerUser = (values, actions) => {
    setEmail(values.email);
    dispatch(authActions.signup(values));
  };

  return (
    <div className="container">
      {!isRegistrationSuccess ? (
        <Formik
          validationSchema={schema}
          onSubmit={registerUser}
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
            <Form noValidate onSubmit={handleSubmit} autoComplete="off">
              <Form.Row as={Col} md="7" className="formbox">
                {registrationerror && (
                  <Notification type="error" message={registrationerror} />
                )}

                <Col xs={12}>
                  <div className="join_us_title">SIGNUP</div>
                </Col>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    className="form_input"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    isValid={touched.firstName && !errors.firstName}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    className="form_input"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    isValid={touched.lastName && !errors.lastName}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustom03">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="form_input"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustom04">
                  <Form.Control
                    type="tel"
                    placeholder="Phone number (Optional)"
                    className="form_input notvalid"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustom05">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    defaultValue=""
                    className="form_input"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom06">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="form_input"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    required
                    name="agreement2"
                    label="Opt-in to receive Artist communications"
                    onChange={handleChange}
                    isInvalid={!!errors.agreement2}
                    feedback={errors.agreement2}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    required
                    name="agreement3"
                    label="Opt-in to receive Phlote communications"
                    onChange={handleChange}
                    isInvalid={!!errors.agreement3}
                    feedback={errors.agreement3}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Row>
                    <Col className="col-auto mr-auto">
                      <Link style={{ color: "white" }} to="/contest/auth/login">
                        {" "}
                        Already have an account? Login
                      </Link>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="align-self-center text-center">
                      <SubmitButton
                        isLoading={isLoading}
                        buttonText="REGISTER"
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Form.Row>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="mt-5 text-center">
          <h5>
            {" "}
            We have sent an email to {email} with an account activation link.
            Thank you.
          </h5>
        </div>
      )}
    </div>
  );
}
