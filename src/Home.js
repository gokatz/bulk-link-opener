import React from "react";
import Item from "./Item";
import TextInput from "./TextInput";

import "./styles.css";

export default class Home extends React.Component {
  state = {
    items: [],
    isFetchingList: false
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

  writeUserData(text) {
    let inputField = this.refs.inputField || {};
    text = text || inputField.value;

    if (!text) {
      return;
    }
    if (!window.confirm("Sure want to add?")) {
      return;
    }

    let paginatedListRef = window.firebase.database().ref(this.databaseRef);
    var newItemRef = paginatedListRef.push();
    inputField.value = "";
    return newItemRef.set({
      value: text,
      date: this.dateRef
    });
  }

  deleteItem = id => {
    return window.firebase
      .database()
      .ref(`${this.databaseRef}/${id}`)
      .remove();
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

  render() {
    let { isFetchingList, items } = this.state;
    let { isFetchingUser } = this.props;

    let itemsList = (
      <div className="text-center text-muted">No Items Found</div>
    );

    if (isFetchingList || isFetchingUser) {
      itemsList = <div className="text-center text-muted">Loading...</div>;
    } else if (items.length) {
      itemsList = items.map(text => {
        return <Item text={text} key={text.id} deleteItem={this.deleteItem} />;
      });
    }

    return (
      <div className="App container">
        <div className="col-xs-12 col-md-6">
          <TextInput
            addText={this.addText}
            writeUserData={this.writeUserData}
          />

          <hr />

          {itemsList}

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
