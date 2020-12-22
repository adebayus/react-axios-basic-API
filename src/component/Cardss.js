import React from 'react'
import { Button, Card, Col, ListGroup } from 'react-bootstrap';

function Cardss(props) {
    return (
      <Col md={6} key={props.member.id} style={{ padding: "0 5px" }}>
        <Card style={{ width: "18rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item>{props.member.id}</ListGroup.Item>
            <ListGroup.Item>{props.member.first_name}</ListGroup.Item>
            <ListGroup.Item>{props.member.last_name}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Button
              variant="primary"
              onClick={props.edit}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={props.delete}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
}

export default Cardss
