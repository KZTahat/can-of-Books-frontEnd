import React from "react";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withAuth0 } from "@auth0/auth0-react";
import Model from "./Componenets/Model";
import axios from "axios";
import "./BestBooks.css";
import UpdateForm from "./Componenets/UpdateForm";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showUpdateForm: false,
      userBooks: [],
      index: 0,
    };
  }

  componentDidMount = async () => {
    console.log(this.props.auth0.user.email);
    let response = await axios.get(
      `${process.env.REACT_APP_SERVER}/books?email=${this.props.auth0.user.email}`
    );
    console.log(response.data);
    this.setState({
      userBooks: response.data,
    });
  };
  // Show and hide Model
  showModel = () => {
    this.setState({
      show: true,
    });
  };
  hideModel = () => {
    this.setState({
      show: false,
    });
  };
  // Add New Book
  addBook = async (event) => {
    event.preventDefault();
    const newBookData = {
      bookName: event.target.bookName.value,
      description: event.target.description.value,
      imgUrl: event.target.imgUrl.value,
      state: event.target.state.value,
      email: this.props.auth0.user.email,
    };
    console.log(newBookData);
    const newResponse = await axios.post(
      `${process.env.REACT_APP_SERVER}/addbook`,
      newBookData
    );
    this.setState({
      userBooks: newResponse.data,
      show: false,
    });
  };
  // Delete Selected Book
  deleteBook = async (index) => {
    let paramsObj = {
      email: this.props.auth0.user.email,
    };
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER}/deletebook/${index}`,
      { params: paramsObj }
    );
    console.log(response);
    this.setState({
      userBooks: response.data,
    });
  };
  // SHOW UPDATE FORM
  showUpdateModel = (index) => {
    this.setState({
      showUpdateForm: true,
      index: index,
    });
  };
  // Update Selected Book
  updateBook = async (event) => {
    event.preventDefault();
    const updatedBookData = {
      bookName: event.target.bookName.value,
      description: event.target.description.value,
      imgUrl: event.target.imgUrl.value,
      state: event.target.state.value,
      email: this.props.auth0.user.email,
    };
    let response = await axios.put(
      `${process.env.REACT_APP_SERVER}/updatebook/${this.state.index}`,
      updatedBookData
    );
    this.setState({
      userBooks: response.data,
      showUpdateForm: false,
    });
  };
  // Rendering Stuff
  render() {
    return (
      <Jumbotron>
        <Model
          hideModel={this.hideModel}
          show={this.state.show}
          addBook={this.addBook}
        ></Model>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <button
          style={{ position: "absolute", top: "150px", left: "560px" }}
          onClick={this.showModel}
        >
          Add Book
        </button>
        {this.state.showUpdateForm && (
          <UpdateForm
            index={this.state.index}
            data={this.state.userBooks}
            updateBook={this.updateBook}
          ></UpdateForm>
        )}
        {this.state.userBooks.map((element, index) => {
          return (
            <div key={index} style={{ display: "inline-block" }}>
              <Card
                style={{
                  width: "18rem",
                  // display: "inline-block",
                  margin: "30px",
                }}
              >
                <Card.Img variant="top" src={element.img} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>description: {element.description}</Card.Text>
                  <Card.Text>Status: {element.status}</Card.Text>
                </Card.Body>
                <Button variant="danger" onClick={() => this.deleteBook(index)}>
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() => this.showUpdateModel(index)}
                >
                  Update
                </Button>
              </Card>
            </div>
          );
        })}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
