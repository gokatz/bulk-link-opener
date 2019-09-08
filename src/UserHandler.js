import React, { Fragment } from "react";

export default class UserHandler extends React.Component {
  render() {
    let { user, isFetchingUser, handleUserAuthState } = this.props;

    if (isFetchingUser) {
      return <div>fetching User...</div>;
    }

    if (user) {
      return (
        <Fragment>
          {user.email} &nbsp;
          <small
            className="btn-link"
            onClick={() => handleUserAuthState("signout")}
          >
            Sign Out
          </small>
        </Fragment>
      );
    }

    return (
      <small className="btn-link" onClick={() => handleUserAuthState("signin")}>
        Sign In
      </small>
    );
  }
}
