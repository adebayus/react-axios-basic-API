import React from "react";
import { Button, Form } from "react-bootstrap";

function Formss(props) {
  return (
    <Form
      style={{
        border: "1px solid rgba(0,0,0, .125",
        borderRadius: "5px",
      }}
      onSubmit={props.onSubmitHandler}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First Name"
          value={props.first_name}
          name="first_name"
          onChange={props.inputOnchangeHandler}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={props.last_name}
          name="last_name"
          onChange={props.inputOnchangeHandler}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={props.buttonDisabled}
      >
        Submit
      </Button>
    </Form>
  );
}

export default Formss;
