import React, { useState, useEffect } from "react";
import "./style.scss";
import { Form, Button, Col, Spinner } from "react-bootstrap";
import FadeIn from "react-fade-in";
import JoinUsService from "services/JoinUsService";
import Notification from "../../components/Notification/Notification";

const JoinUs = () => {
  const [validated, setValidated] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = "JOIN US | PHLOTE.CO";
  });

  let artist_data = [];

  //Handle Form Submit
  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      //If All fields is valid
      setSpinner(true);
      event.preventDefault();
      event.stopPropagation();

      var data = {
        "First Name": event.target.elements.first_name.value,
        "Last Name": event.target.elements.last_name.value,
        "Email Address": event.target.elements.email.value,
      };

      //Get Checkbox Value
      if (event.target.elements.rArtist.checked)
        artist_data.push(event.target.elements.rArtist.value);

      if (event.target.elements.vArtist.checked)
        artist_data.push(event.target.elements.vArtist.value);

      if (event.target.elements.curator.checked)
        artist_data.push(event.target.elements.curator.value);

      if (event.target.elements.collector.checked)
        artist_data.push(event.target.elements.collector.value);

      if (event.target.elements.investor.checked)
        artist_data.push(event.target.elements.investor.value);

      setTimeout(() => {
        form.reset();
      }, 2000);
      let artist_roles = "";
      if (artist_data.length > 0) {
        artist_roles = artist_data.join("|");
        data["Artist Roles"] = artist_roles;
      }

      const requestData = { records: [{ fields: data }] };

      //CAll Airtable API
      JoinUsService.postJoinus(requestData)
        .then((res) => {
          setSpinner(false); //stop spinner
          setValidated(false);
          if (res.records !== undefined && res.records.length > 0) {
            setIsSuccess(true);
          } else {
            setErrorMessage(res.error.message);
          }
          //setRemoveBorder(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }

    setValidated(true);
    setIsSuccess(false);
    setErrorMessage(false);
  };

  //Show notification message
  function Msg({ isSuccess }) {
    if (!isSuccess && errorMessage) {
      return <Notification type="error" message={errorMessage} />;
    }
    if (!isSuccess && !errorMessage) {
      return null;
    }
    //IF Success from the API
    if (isSuccess) {
      return <Notification type="success" message="Thanks for Join Us." />;
    }
  }

  //Show Spinner
  function Loader({ spinner }) {
    if (!spinner) {
      return null;
    }
    return (
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <FadeIn>
        <div className="page-container container">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row as={Col} md="6" className="formbox">
              <Msg isSuccess={isSuccess} />
              <div className="join_us_title">Join Us </div>
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Control
                  type="text"
                  placeholder="First name"
                  defaultValue=""
                  className="form_input notvalid"
                  name="first_name"
                />
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Control
                  type="text"
                  placeholder="Last name"
                  defaultValue=""
                  className="form_input notvalid"
                  name="last_name"
                />
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Control
                  required
                  type="email"
                  placeholder="Email"
                  defaultValue=""
                  className="form_input "
                  name="email"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group as={Col} md="6" className="formbox">
              <div className="checkbox_title  pl-2">I AM A: </div>
            </Form.Group>
            <Form.Group as={Col} md="6" className="formbox">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id="RArtist"
                  type="checkbox"
                  value="Recording Artist"
                  name="rArtist"
                />
                <Form.Check.Label htmlFor="RArtist">
                  Recording Artist
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group as={Col} md="6" className="formbox">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id="vArtist"
                  type="checkbox"
                  value="Visual Artist"
                  name="vArtist"
                />
                <Form.Check.Label htmlFor="vArtist">
                  Visual Artist
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group as={Col} md="6" className="formbox">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id="Curator"
                  type="checkbox"
                  value="Curator"
                  name="curator"
                />
                <Form.Check.Label htmlFor="Curator">Curator</Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group as={Col} md="6" className="formbox">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id="Collector"
                  type="checkbox"
                  value="Collector"
                  name="collector"
                />
                <Form.Check.Label htmlFor="Collector">
                  Collector
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group as={Col} md="6" className="formbox">
              <Form.Check className="checkbox">
                <Form.Check.Input
                  id="Investor"
                  type="checkbox"
                  value="Investor"
                  name="investor"
                />
                <Form.Check.Label htmlFor="Investor">Investor</Form.Check.Label>
              </Form.Check>
            </Form.Group>

            <Form.Group as={Col} md="6" className="formbox">
              <Button type="submit" className="submitbtn">
                <Loader spinner={spinner} />
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </FadeIn>
    </>
  );
};

export default JoinUs;
