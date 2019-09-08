import React from "react";
import UserHandler from "./UserHandler";
import { Link, Redirect, withRouter } from "react-router-dom";

import "./styles.css";

class NavBar extends React.Component {
  componentDidMount() {
    window.firebase.auth().onAuthStateChanged(user => {
      this.forceUpdate();
    });
  }

  handleUserAuthState = operation => {
    const { history } = this.props;

    if (operation === "signout") {
      window.firebase.auth().signOut();
      history.push("/auth");
    } else if (operation === "signin") {
      history.push("/auth");
    }
  };

  navBarMarkup(user) {
    let { isFetchingUser } = this.props;
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Opener X
        </Link>

        <div id="navbarText">
          <ul className="navbar-nav mr-auto">
            {/* <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li> */}
          </ul>
          <span className="navbar-text">
            <UserHandler
              user={user}
              isFetchingUser={isFetchingUser}
              handleUserAuthState={this.handleUserAuthState}
            />
          </span>
        </div>
      </nav>
    );
  }

  render() {
    var user = window.firebase.auth().currentUser;
    return this.navBarMarkup(user);
  }
}

export default withRouter(NavBar);
