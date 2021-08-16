import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Profile from './Profile';
import BestBooks from './BestBooks';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';


class App extends React.Component {

  render() {
    console.log('app', this.props);
    return(
      <>
      
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {this.props.auth0.isAuthenticated ? <BestBooks/> : <LoginButton/>}
                
              </Route >
              <Route path='/profile'>
                <Profile/>
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
        
      </>
    );
  }
}

export default withAuth0(App);
