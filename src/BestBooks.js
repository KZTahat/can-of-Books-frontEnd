import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBooks: [],
    };
  }

  async componentDidMount() {
    let response = await axios.get(
      `${process.env.REACT_APP_SERVER}/books?email=kztahat96@gmail.com`
    );
    console.log(response.data);
    this.setState({
      userBooks: response.data,
    });
    // .then((element) => {
    //   console.log("element.data " + element);
    //   this.setState({
    //     userBooks: element.data,
    //   });
    //   console.log("this.userBooks " + this.state.userBooks);
    // })
    // .catch((error) => {
    //   console.log("inside the error ", error);
    // });
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.state.userBooks.map((element) => {
          return (
            <>
              <Card
                style={{
                  width: "18rem",
                  display: "inline-block",
                  margin: "30px",
                }}
              >
                <Card.Img variant="top" src={element.img} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text>description: {element.description}</Card.Text>
                  <Card.Text>Status: {element.status}</Card.Text>
                </Card.Body>
              </Card>
            </>
          );
        })}
      </Jumbotron>
    );
  }
}

export default MyFavoriteBooks;
