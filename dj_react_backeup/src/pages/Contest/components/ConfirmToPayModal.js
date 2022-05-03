import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import SongDetailCard from "./SongDetailsCard";

function ConfirmToPayModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "black" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pay for Song Submission
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.songs.map((song) => (
          <SongDetailCard song={song} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={props.uploading}
          className="contestsubmitbtn"
          onClick={props.onConfirm}
        >
          {props.uploading ? (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            "Confirm"
          )}
        </Button>
        <Button className="contestsubmitbtn" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmToPayModal;
