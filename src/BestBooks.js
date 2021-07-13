import React from "react";
// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import { withAuth0 } from "@auth0/auth0-react";
import "./BestBooks.css";

class MyFavoriteBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userBooks: [],
  //   };
  // }

  // componentDidMount = async () => {
  //   console.log(this.props.auth0.user.email);
  //   let response = await axios.get(
  //     `${process.env.REACT_APP_SERVER}/books?email=${this.props.auth0.user.email}`
  //   );
  //   console.log(response.data);
  //   this.setState({
  //     userBooks: response.data,
  //   });
  // };

  render() {
    console.log(this.props.userBooks);
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        <button
          style={{ position: "absolute", top: "150px", left: "560px" }}
          onClick={this.props.showModel}
        >
          Add Book
        </button>
        {this.props.userBooks.map((element, index) => {
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
                <Button
                  variant="danger"
                  onClick={() => this.props.deleteBook(index)}
                >
                  Delete
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
