import React from "react";

import "./styles.css";

export default class Auth extends React.Component {
  componentDidMount() {
    window.globalFirebaseAuthUI.start(
      "#firebaseui-auth-container",
      window.uiConfig
    );
  }
  render() {
    return <div id="firebaseui-auth-container" />;
  }
}
