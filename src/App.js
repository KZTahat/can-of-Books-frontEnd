import React from "react";
import Header from "./Header";
import MyFavoriteBooks from "./BestBooks";
import { withAuth0 } from "@auth0/auth0-react";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Profile from "./Componenets/Profile";
import axios from "axios";

class App extends React.Component {
  // Rendering Info
  render() {
    // console.log('app', this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated;
    return (
      <>      
        <Router>
          {/* <IsLoadingAndError> */}
          <Header />
          <Switch>
            <Route exact path="/">              
              {isAuthenticated ? (
                <MyFavoriteBooks/>
              ) : (
                <Login />
              )}
            </Route>
            <Route exact path="/profile">              
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
