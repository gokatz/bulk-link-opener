import React, { Fragment } from "react";
import ItemList from "./ItemList";
import TextInput from "./TextInput";
import StaredFilter from "./StaredFilter";

import "./styles.css";
import ClientAuth from "./ClientAuth";

export default class Home extends React.Component {
  state = {
    isFetchingList: false,
    currentText: "",
    isAuthenticated: false,
    showOnlyStared: false
  };

  get dateRef() {
    let date = new Date();
    let dateRef = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
    return dateRef;
  }

  // formatDate(dateString = "") {
  //   return dateString.split("_").join("/");
  // }

  get databaseRef() {
    console.log(this.props);
    let { user } = this.props;
    let { uid = "" } = user || {};
    return uid ? `users/${uid}` : null;
  }

  writeUserData = text => {
    text = text || this.state.currentText;

    if (!text) {
      return;
    }
    if (!window.confirm("Sure want to add?")) {
      return;
    }

    let paginatedListRef = window.firebase.database().ref(this.databaseRef);
    var newItemDBRef = paginatedListRef.push();
    this.setState({
      currentText: ""
    });
    return newItemDBRef.set({
      value: text,
      date: this.dateRef,
      dateStr: new Date().getTime()
    });
  };

  addText = async event => {
    let { keyCode, target } = event;
    if (keyCode !== 13) {
      return;
    }
    await this.writeUserData(target.value);
  };

  authUser = () => {
    let key = this.keyNode.value;
    if (key === "1308") {
      this.setState({
        isAuthenticated: true
      });
    }
  };

  handleViewChange = ({ showOnlyStared }) => {
    this.setState({
      showOnlyStared: showOnlyStared
    });
  };

  render() {
    let { currentText, isAuthenticated, showOnlyStared } = this.state;
    let { isFetchingUser, user } = this.props;
    let { databaseRef, addText, writeUserData, handleViewChange } = this;

    return (
      <div className="App container">
        <div
          className="col-xs-12 col-md-6"
          style={{
            marginBottom: "5em"
          }}
        >
          <TextInput
            updateInputText={value => {
              this.setState({
                currentText: value
              });
            }}
            currentText={currentText}
            addText={addText}
            writeUserData={writeUserData}
          />

          <hr />

          {isAuthenticated ? (
            <Fragment>
              <StaredFilter
                isAuthenticated={isAuthenticated}
                onViewChange={handleViewChange}
              />

              <ItemList
                isFetchingUser={isFetchingUser}
                user={user}
                showOnlyStared={showOnlyStared}
                databaseRef={databaseRef}
              />
            </Fragment>
          ) : (
            <ClientAuth
              authUser={this.authUser}
              updateKeyNode={node => {
                this.keyNode = node;
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
