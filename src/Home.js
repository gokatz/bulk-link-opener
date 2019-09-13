import React, { Fragment } from "react";
import Item from "./Item";
import TextInput from "./TextInput";

import "./styles.css";

export default class Home extends React.Component {
  state = {
    items: [],
    isFetchingList: false,
    currentText: "",
    isAuthenticated: false
  };

  componentDidMount() {
    this.props.user && this.getTextsFromStorage();
  }

  getTextsFromStorage() {
    this.setState({
      isFetchingList: true
    });

    let listRef = window.firebase.database().ref(this.databaseRef);
    listRef.on("value", snapshot => {
      this.updateState(snapshot.val());
      this.setState({
        isFetchingList: false
      });
    });
  }

  updateState(value) {
    console.log("Texts: ", value);
    let normalizedItemsArray = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        let text = value[key];
        text.id = key;
        normalizedItemsArray.push(text);
      }
    }
    this.setState({
      items: normalizedItemsArray || []
    });
    return value;
  }

  get dateRef() {
    let date = new Date();
    let dateRef = `${date.getDate()}_${date.getMonth()}_${date.getFullYear()}`;
    return dateRef;
  }

  // formatDate(dateString = "") {
  //   return dateString.split("_").join("/");
  // }

  get databaseRef() {
    let { user: { uid = "" } = {} } = this.props;
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
      date: this.dateRef
    });
  };

  deleteItem = ({ id, star }) => {
    if (star) {
      alert("cannot delete a starred link");
      return;
    }
    return window.firebase
      .database()
      .ref(`${this.databaseRef}/${id}`)
      .remove();
  };

  starItem = id => {
    return window.firebase
      .database()
      .ref(`${this.databaseRef}/${id}`)
      .update({
        star: true
      });
  };

  unstarItem = id => {
    return window.firebase
      .database()
      .ref(`${this.databaseRef}/${id}`)
      .update({
        star: false
      });
  };

  openInBrowser = () => {
    let items = this.state.items;
    let selectedItems = items.filter(text => {
      return text.isSelected;
    });
    selectedItems.forEach(text => {
      window.open(text.value, "_blank");
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

  render() {
    let { isFetchingList, items, currentText, isAuthenticated } = this.state;
    let { isFetchingUser } = this.props;

    let itemsList = (
      <div className="text-center text-muted">No Items Found</div>
    );

    if (isFetchingList || isFetchingUser) {
      itemsList = <div className="text-center text-muted">Loading...</div>;
    } else if (items.length) {
      itemsList = items.map(text => {
        return (
          <Item
            text={text}
            key={text.id}
            deleteItem={this.deleteItem}
            starItem={this.starItem}
            unstarItem={this.unstarItem}
          />
        );
      });
    }

    return (
      <div className="App container">
        <div className="col-xs-12 col-md-6">
          <TextInput
            updateInputText={value => {
              this.setState({
                currentText: value
              });
            }}
            currentText={currentText}
            addText={this.addText}
            writeUserData={this.writeUserData}
          />

          <hr />

          {isAuthenticated ? (
            itemsList
          ) : (
            <Fragment>
              <div className="form-group">
                <input
                  className="form-control"
                  placeholder="key"
                  type="password"
                  ref={node => {
                    this.keyNode = node;
                  }}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-secondary" onClick={this.authUser}>
                  Enter Key
                </button>
              </div>
            </Fragment>
          )}

          <hr />
          {itemsList.length && (
            <button className="btn btn-primary" onClick={this.openInBrowser}>
              Open In Browser
            </button>
          )}
        </div>
      </div>
    );
  }
}
