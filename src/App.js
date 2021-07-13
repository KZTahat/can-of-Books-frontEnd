import React from "react";
import Header from "./Header";
import MyFavoriteBooks from "./BestBooks";
import { withAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Componenets/Profile";
import Model from "./Componenets/Model";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      userBooks: [],
    };
  }
  componentDidMount = async () => {
    // console.log(this.props.auth0.user.email);
    let response = await axios.get(
      `${process.env.REACT_APP_SERVER}/books?email=kztahat96@gmail.com`
    );
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

  // Rendering Info
  render() {
    // console.log('app', this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated;
    return (
      <>
        <Model
          hideModel={this.hideModel}
          show={this.state.show}
          addBook={this.addBook}
        ></Model>
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">
              {/* if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {isAuthenticated ? (
                <MyFavoriteBooks
                  showModel={this.showModel}
                  userBooks={this.state.userBooks}
                  deleteBook={this.deleteBook}
                />
              ) : (
                <Login />
              )}
            </Route>
            <Route exact path="/profile">
              {/* a route with a path of '/profile' that renders a `Profile` component */}
              <Profile />
            </Route>
          </Switch>
          <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
