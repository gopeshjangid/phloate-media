import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function SongDetailCard({ song }) {
  return (
    <Card
      key={song}
      className="text-center"
      style={{ color: "black", marginBottom: "15px" }}
    >
      <Card.Header>{song.title}</Card.Header>
      <Card.Body>
        <Card.Text as="div">
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
            <Col className="text-left text-truncate">{song.walletAddress}</Col>
          </Row>
          <Row>
            <Col className="text-right">Image:</Col>
            <Col className="text-left text-truncate">{song.image}</Col>
          </Row>
          <Row>
            <Col className="text-right">File Upload:</Col>
            <Col className="text-left">{song.file.name}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SongDetailCard;
