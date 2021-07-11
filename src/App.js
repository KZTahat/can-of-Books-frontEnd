import React from 'react';
import Header from './Header';
import MyFavoriteBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Login';
// import LogoutButton from './Componenets/LogOutButton';
import Profile from './Componenets/Profile';

class App extends React.Component {

  render() {
    // console.log('app', this.props);
    const isAuthenticated = this.props.auth0.isAuthenticated;    
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
                {isAuthenticated ? <MyFavoriteBooks /> : <Login />}
              </Route >
              <Route exact path='/profile'>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
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