import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

import SongDetailCard from "./SongDetailsCard";
import { uploadSong } from "../../../redux/modules/Contest/contestApi";
import Notification from "../../../components/Notification/Notification";

function SongConfirmationModal(props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onConfirm = async () => {
    setUploading(true);
    setError("");
    try {
      const res = await uploadSong(props.song.file);
      setUploading(false);
      props.onFormConfirmation({
        ...props.song,
        songUrl: res.data.fileUrl,
      });
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    setUploading(false);
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ color: "black" }}
    >
      {error && <Notification type="error" message={error} />}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Song Details For Contest
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SongDetailCard song={props.song} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={uploading}
          className="contestsubmitbtn"
          onClick={onConfirm}
        >
          {uploading ? (
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

export default SongConfirmationModal;
