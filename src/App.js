import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Profile";
import BestBooks from "./BestBooks";
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./Login";

class App extends React.Component {
  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login />}
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
