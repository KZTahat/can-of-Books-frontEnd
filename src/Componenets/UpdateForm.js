import React from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class UpdateForm extends React.Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.updateBook}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Name</Form.Label>
            <Form.Control type="text" defaultValue={this.props.data[this.props.index].name} name="bookName"/>
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" defaultValue={this.props.data[this.props.index].description} name="description"/>
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL</Form.Label>
            <Form.Control type="text" defaultValue={this.props.data[this.props.index].img} name="imgUrl"/>
          </Form.Group>
          {/*  */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" defaultValue={this.props.data[this.props.index].status} name="state"/>
          </Form.Group>
          {/*  */}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </>
    );
  }
}

export default UpdateForm;
