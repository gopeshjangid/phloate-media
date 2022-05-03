import React from "react";
import { Button, Spinner } from "react-bootstrap";

export default function SubmitButton({ isLoading, buttonText }) {
  return (
    <Button
      type="submit"
      style={{ marginTop: "30px" }}
      className="contestsubmitbtn"
    >
      {isLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        buttonText
      )}
    </Button>
  );
}
