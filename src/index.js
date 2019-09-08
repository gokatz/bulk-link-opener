import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Auth from "./Auth";
import NavBar from "./NavBar";
import * as serviceWorker from "./serviceWorker";

class App extends React.Component {
  state = {
    isFetchingUser: true,
    user: null
  };

  componentDidMount() {
    var firebaseAuth = window.firebase.auth();
    firebaseAuth.onAuthStateChanged(user => {
      this.setState({
        user,
        isFetchingUser: false
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar isFetchingUser={this.state.isFetchingUser} />

          <Route
            exact
            path="/"
            component={() => (
              <Home
                user={this.state.user}
                isFetchingUser={this.state.isFetchingUser}
              />
            )}
          />
          <Route exact path="/auth" component={Auth} />
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
serviceWorker.register();
