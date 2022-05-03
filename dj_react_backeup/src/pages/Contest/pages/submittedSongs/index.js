import React, { useEffect, useState } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { getSubmittedSongs } from "../../../../redux/modules/Contest/contestApi";

export function SubmittedSongs() {
  const [loading, setLoading] = useState(false);
  const [songsList, setSongsList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    setLoading(true);
    const res = await getSubmittedSongs();
    setSongsList(res.submissions);
    setLoading(false);
  };

  return (
    <div className="container">
      <Row className="text-center mt-3 mb-5">
        <Col md={4}>
          <h5>Uploaded Songs List</h5>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Button
            className="contestsubmitbtn"
            onClick={() => history.push("/contest/submitSongs/new")}
          >
            Upload More
          </Button>
        </Col>
      </Row>
      {!loading ? (
        !songsList.length ? (
          "No songs uploaded yet."
        ) : (
          <Row className="justify-content-md-center">
            <Col xs lg="10">
              <div>
                <div>
                  <Row>
                    <Col>Title</Col>
                    <Col>Artist Name</Col>
                    <Col>Genre</Col>
                  </Row>
                </div>
                <hr style={{ backgroundColor: "white", height: "1px" }} />
                <div>
                  {songsList.map((song, index) => (
                    <div key={index}>
                      <Row>
                        <Col>{song.title}</Col>
                        <Col>{song.artist_name}</Col>
                        <Col>{song.genre}</Col>
                      </Row>
                      {index !== songsList.length - 1 && (
                        <hr style={{ backgroundColor: "white" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        )
      ) : (
        <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
