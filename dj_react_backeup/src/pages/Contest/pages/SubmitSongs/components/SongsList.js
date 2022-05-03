import React from "react";
import { Col, Row, Card } from "react-bootstrap";

export function SongsList({ songs }) {
  return (
    <div>
      {songs.map((song) => (
        <Card
          key={song}
          className="text-center"
          style={{ color: "black", marginBottom: "15px" }}
        >
          <Card.Header>{song.title}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col className="text-right">Artist Name:</Col>
                <Col className="text-left">{song.artistName}</Col>
              </Row>
              <Row>
                <Col className="text-right">Genre:</Col>
                <Col className="text-left">{song.genre}</Col>
              </Row>
              <Row>
                <Col className="text-right">Wallet address:</Col>
                <Col className="text-left text-truncate">
                  {song.walletAddress}
                </Col>
              </Row>
              <Row>
                <Col className="text-right">Image : </Col>
                <Col className="text-left text-truncate">{song.image}</Col>
              </Row>
              <Row>
                <Col className="text-right">File : </Col>
                <Col className="text-left text-truncate">{song.file.name}</Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
