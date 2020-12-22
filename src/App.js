import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import axios from 'axios'
import Cards from './component/Cardss'
import Formss from './component/Formss'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      first_name: "",
      last_name: "",
      buttonDisabled: false,
      formStatus: "create",
      memberIdSelected: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => {
        // console.log('response', Response)
        this.setState({ members: response.data.data });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  inputOnchangeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmitHandler = (e) => {
    var url = "https://reqres.in/api/users";
    console.log("form di submit");
    this.setState({ buttonDisabled: true });
    e.preventDefault();
    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    };
    if (this.state.formStatus === "create") {
      this.addMember(url, payload);
    } else {
      // url untuk form edit
      url = `https://reqres.in/api/users/${this.state.memberIdSelected}`;
      this.editMember(url, payload);
    }
  };

  addMember = (url, payload) => {
    axios
      .post(url, payload)
      .then((response) => {
        // var members = [...this.state.members]
        // members.push(response.data)
        // this.setState({ members })
        console.log("respose", response.data);
        var members = [...this.state.members, response.data];
        this.setState({ members });
        this.setState({ members, buttonDisabled: false });
        // console.log([...this.state.members, response.data])
      })
      .catch((error) => {
        this.setState({ buttonDisabled: false });
        console.log("ini error", error);
      });
  };

  editMember = (url, payload) => {
    axios
      .put(url, payload)
      .then((response) => {
        var members = [...this.state.members];
        var indexMember = members.findIndex(
          (member) => member.id === this.state.memberIdSelected
        );

        // mengganti data yang ada dalam state members dan index yang sesuai
        members[indexMember].first_name = response.data.first_name;
        members[indexMember].last_name = response.data.last_name;
        this.setState({
          members,
          buttonDisabled: false,
          first_name: "",
          last_name: "",
          formStatus: "create",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteButtonHandler = (id) => {
    var url = `https://reqres.in/api/users/${id}`;
    axios
      .delete(url)
      .then((response) => {
        if(response.status === 204) {
          var members = [...this.state.members]
          var index = members.findIndex(member => member.id === id)
          members.splice(index, 1)
          this.setState({ members })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editButtonHandler = (member) => {
    console.log(member);
    this.setState({
      first_name: member.first_name,
      last_name: member.last_name,
      formStatus: "edit",
      memberIdSelected: member.id,
    });
  };

  render() {
    return (
      <Container>
        <h1 style={{ textAlign: "center" }}>CodePolitan DevSchool</h1>
        <Row>
          <Col md={6}>
            <h2 style={{ textAlign: "center" }}>Member</h2>
            <Row>
              {this.state.members.map((member, index) => {
                return (
                  <Cards
                  member={member}
                  edit={ () => this.editButtonHandler(member)}
                  delete={() => this.deleteButtonHandler(member.id)}
                  />
                  // <Col md={6} key={member.id} style={{ padding: "0 5px" }}>
                  //   <Card style={{ width: "18rem" }}>
                  //     <ListGroup variant="flush">
                  //       <ListGroup.Item>{member.id}</ListGroup.Item>
                  //       <ListGroup.Item>{member.first_name}</ListGroup.Item>
                  //       <ListGroup.Item>{member.last_name}</ListGroup.Item>
                  //     </ListGroup>
                  //     <Card.Body>
                  //       <Button
                  //         variant="primary"
                  //         onClick={() => this.editButtonHandler(member)}
                  //       >
                  //         Edit
                  //       </Button>
                  //       <Button variant="danger" onClick={() => this.deleteButtonHandler(member.id)} >Delete</Button>
                  //     </Card.Body>
                  //   </Card>
                  // </Col>
                );
              })}
            </Row>
          </Col>
          <Col md={6}>
            <h2 style={{ textAlign: "center" }}>
              Form {this.state.formStatus}{" "}
            </h2>
            <Formss
              inputOnchangeHandler={this.inputOnchangeHandler}
              onSubmitHandler={this.onSubmitHandler}
              first_name = {this.state.first_name}
              last_name = {this.state.last_name}
              buttonDisabled = {this.state.buttonDisabled}
            />
            {/* <Form
              style={{
                border: "1px solid rgba(0,0,0, .125",
                borderRadius: "5px",
              }}
              onSubmit={this.onSubmitHandler}
            >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={this.state.first_name}
                  name="first_name"
                  onChange={this.inputOnchangeHandler}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={this.state.last_name}
                  name="last_name"
                  onChange={this.inputOnchangeHandler}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={this.state.buttonDisabled}
              >
                Submit
              </Button>
            </Form> */}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
