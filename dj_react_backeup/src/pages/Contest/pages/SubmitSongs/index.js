import React, { useState } from "react";
import { Container, Form, Col, Row, Button, Spinner } from "react-bootstrap";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
import FadeIn from "react-fade-in";
import { loadStripe } from "@stripe/stripe-js";

import Notification from "../../../../components/Notification/Notification";
import SongConfirmationModal from "../../components/SongConfirmationModal";
import { SongsList } from "./components/SongsList";
import {
  getPaymentSession,
  submitContest,
  uploadImage,
} from "../../../../redux/modules/Contest/contestApi";
import ConfirmToPayModal from "../../components/ConfirmToPayModal";
import "./style.scss";

const schema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  artistName: yup.string().required("Artist name is required!"),
  genre: yup.string().required("Genre is required"),
  walletName: yup.string(),
  walletAddress: yup.string().required("wallet address is required"),
});

const initialValues = {
  title: "",
  artistName: "",
  genre: "",
  walletName: "",
  walletAddress: "",
};

const stripePromise = loadStripe(
  "pk_test_51IPUS1J111AzNrE2gfG026XQweHkYD2ZNDps3u6lhx2OvUynSLQFDr4quZ45y49kNKLFFDy2tLGM1NdjHz4qK7j0001YFBRZ7f"
);

export default function SubmitSongs() {
  const [currentFormFile, setCurrentFormFile] = useState(null);
  const [currentFormImage, setCurrentFormImage] = useState(null);
  const [currentFormImageUrl, setCurrentFormUrl] = useState(null);
  const [confirmedFormValues, setConfirmedFormValues] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const formik = useFormik({
    validationSchema: schema,
    initialValues: initialValues,
  });

  const isFormFilled = (form) => {
    if (form.title && form.artistName && form.genre) return true;
    else return false;
  };

  const onFormConfirmation = (formObject) => {
    setConfirmedFormValues([
      ...confirmedFormValues,
      { ...formObject, imageUrl: currentFormImageUrl },
    ]);
    setModalShow(false);
    setCurrentFormImage(null);
    formik.resetForm(initialValues);
  };

  const uploadImageAndGetUrl = async (file) => {
    setImageUploading(true);
    try {
      const res = await uploadImage(file);
      console.log(file.name);
      setCurrentFormImage(file.name);
      setCurrentFormUrl(res.data.fileUrl);
    } catch (error) {
      console.log(error);
    }
    setImageUploading(false);
  };

  const onPay = async () => {
    setLoading(true);
    setError("");
    try {
      const stripe = await stripePromise;
      const res = await getPaymentSession();
      const { sessionId } = res.data;
      const contestDetails = confirmedFormValues.map((v) => {
        return {
          title: v.title,
          artistName: v.artistName,
          genre: v.genre,
          walletName: v.walletName,
          walletAddress: v.walletAddress,
          songUrl: v.songUrl,
          imageUrl: v.imageUrl,
          paymentSessionId: sessionId,
        };
      });
      await submitContest(contestDetails);
      setLoading(false);
      const result = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        console.log(result.error);
        setError("Something went wrong. Please try again.");
        // error, display the localized error message to your customer
        // using `result.error.message`.
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error.response);
    }
    setLoading(false);
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      {error && <Notification type="error" message={error} />}
      <FadeIn>
        {isFormFilled(formik.values) && (
          <SongConfirmationModal
            show={modalShow}
            onHide={() => {
              formik.setFieldValue(`file`, "");
              setCurrentFormFile(null);
              setCurrentFormImage(null);
              setModalShow(false);
            }}
            song={{
              ...formik.values,
              file: currentFormFile,
              image: currentFormImage,
            }}
            onFormConfirmation={onFormConfirmation}
          />
        )}
        <ConfirmToPayModal
          show={showPaymentModal}
          onHide={() => {
            setShowPaymentModal(false);
          }}
          songs={confirmedFormValues}
          uploading={loading}
          onConfirm={() => onPay()}
        />
        <Container fluid>
          <Row>
            <Col xs={12} md={3} xxl={2}>
              <SongsList songs={confirmedFormValues} />
            </Col>
            <Col xs={12} md={6} xl={6} xxl={4}>
              <>
                <Formik>
                  <Form noValidate autoComplete="off">
                    <Form.Row as={Col} className="formbox">
                      <Col xs={12}>
                        <div className="join_us_title">SUBMIT SONGS</div>
                      </Col>
                      {confirmedFormValues.length >= 1 && (
                        <div className="mb-3 mx-5">
                          {" "}
                          Upload more songs for contest (Max. 3 songs per
                          contest)
                        </div>
                      )}
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Title"
                          className="form_input"
                          name={`title`}
                          value={formik.values.title}
                          onChange={formik.handleChange}
                          isValid={formik.touched.title && !formik.errors.title}
                          isInvalid={formik.errors && !!formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors && formik.errors.title}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Artist Name"
                          className="form_input"
                          name={`artistName`}
                          value={formik.values.artistName}
                          onChange={formik.handleChange}
                          isValid={
                            formik.touched.artistName &&
                            !formik.errors.artistName
                          }
                          isInvalid={
                            formik.errors && !!formik.errors.artistName
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors && formik.errors.artistName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Genre"
                          className="form_input"
                          name={`genre`}
                          value={formik.values.genre}
                          onChange={formik.handleChange}
                          isValid={formik.touched.genre && !formik.errors.genre}
                          isInvalid={formik.errors && !!formik.errors.genre}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors && formik.errors.genre}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          name={`walletName`}
                          as="select"
                          className="form_input"
                          value={formik.values.walletName}
                          onChange={formik.handleChange}
                        >
                          <option value="">
                            What wallet do you use most frequently
                          </option>
                          <option value="none">None</option>
                          <option value="metamask">Metamask</option>
                          <option value="alphaWallet">Alphawallet</option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          {formik.errors && formik.errors.walletName}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Wallet Address If Available"
                          className="form_input"
                          name={`walletAddress`}
                          value={formik.values.walletAddress}
                          onChange={formik.handleChange}
                          isValid={
                            formik.touched.walletAddress &&
                            !formik.errors.walletAddress
                          }
                          isInvalid={
                            formik.errors && !!formik.errors.walletAddress
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors && formik.errors.walletAddress}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom02"
                      >
                        <Form.File id="exampleFormControlFile2" custom>
                          <Form.File.Input
                            onChange={(event) => {
                              if (event.currentTarget.files.length) {
                                uploadImageAndGetUrl(
                                  event.currentTarget.files[0]
                                );
                              }
                              event.currentTarget.value = "";
                            }}
                          />
                          <Form.File.Label
                            data-browse="Upload"
                            className="file_input"
                          >
                            {currentFormImage ? (
                              currentFormImage
                            ) : imageUploading ? (
                              <Spinner
                                animation="border"
                                style={{ marginBottom: "5px" }}
                                size="sm"
                              />
                            ) : (
                              "Upload Image"
                            )}
                          </Form.File.Label>
                        </Form.File>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        controlId="validationCustom01"
                      >
                        <Form.File id="exampleFormControlFile1" custom>
                          <Form.File.Input
                            disabled={
                              !isFormFilled(formik.values) || !formik.isValid
                            }
                            onChange={(event) => {
                              if (event.currentTarget.files.length) {
                                setCurrentFormFile(
                                  event.currentTarget.files[0]
                                );
                                setModalShow(true);
                              }
                            }}
                          />
                          <Form.File.Label
                            data-browse="Upload"
                            className="file_input"
                          >
                            Upload Song
                          </Form.File.Label>
                        </Form.File>
                      </Form.Group>
                      <Row
                        style={{
                          marginTop: "30px",
                        }}
                      >
                        <Row className="justify-content-md-end">
                          <Col xs={6} md={4} xxl={2}>
                            <Button
                              className="contestsubmitbtn"
                              type="button"
                              disabled={!confirmedFormValues.length}
                              onClick={() => setShowPaymentModal(true)}
                            >
                              {loading ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                "Pay To Submit"
                              )}
                            </Button>
                          </Col>
                        </Row>
                      </Row>
                    </Form.Row>
                  </Form>
                </Formik>
              </>
            </Col>
          </Row>
        </Container>
      </FadeIn>
    </div>
  );
}
