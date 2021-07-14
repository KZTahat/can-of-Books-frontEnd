import React from "react";
import { Modal, Button, Card } from "react-bootstrap";

class Model extends React.Component {

  render() {
    return (
      <>
        <Modal show={this.props.show}>
          <Modal.Header closeButton>
            <Modal.Title>Add Book</Modal.Title>
          </Modal.Header>
          <Card.Img variant="top" src={this.props.url} />
          <Modal.Body>
            <form onSubmit={this.props.addBook}>
              <input placeholder="Book Name" type="text" name="bookName" />
              <input placeholder="Description" type="text" name="description" />
              <input placeholder="Img url" type="text" name="imgUrl" />
              <select placeholder="State" type="select" name="state">
                <option value="recommended">Recommended</option>
                <option value="topTen">Top Ten</option>
                <option value="readLater">Read Later</option>
              </select>
              <input type="submit"></input>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModel}>
              Close
            </Button>
            {/* <Button variant="secondary">
              Add Book
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default Model;
