import React, { Fragment, useState } from "react";
import Item from "./Item";

export default class ItemList extends React.Component {
  state = {
    loading: false,
    items: []
  };

  componentDidMount() {
    this.props.user && this.getTextsFromStorage();
  }

  getTextsFromStorage = () => {
    this.setState({
      loading: true
    });

    let listRef = window.firebase.database().ref(this.props.databaseRef);
    listRef.on("value", snapshot => {
      let items = this.normalizeItems(snapshot.val());
      items = items.reverse();
      this.setState({ items });
      this.setState({
        loading: false
      });
    });
  };

  normalizeItems = value => {
    console.log("Texts: ", value);
    let normalizedItemsArray = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        let text = value[key];
        text.id = key;
        normalizedItemsArray.push(text);
      }
    }
    return normalizedItemsArray;
  };

  deleteItem = ({ id, star }) => {
    if (star) {
      alert("cannot delete a starred link");
      return;
    }
    if (!window.confirm("Are you sure to delete this?")) {
      return;
    }
    return window.firebase
      .database()
      .ref(`${this.props.databaseRef}/${id}`)
      .remove();
  };

  starItem = id => {
    return window.firebase
      .database()
      .ref(`${this.props.databaseRef}/${id}`)
      .update({
        star: true
      });
  };

  unstarItem = id => {
    return window.firebase
      .database()
      .ref(`${this.props.databaseRef}/${id}`)
      .update({
        star: false
      });
  };

  filterItems = () => {
    return this.state.items.filter(({ star }) => {
      return star;
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

  render() {
    let { isFetchingUser, showOnlyStared } = this.props;
    let { loading, items } = this.state;

    if (showOnlyStared) {
      items = this.filterItems();
    }

    return (
      <Fragment>
        {loading || isFetchingUser ? (
          <div className="text-center text-muted">Loading...</div>
        ) : items.length ? (
          items.map(text => {
            return (
              <Item
                text={text}
                key={text.id}
                deleteItem={this.deleteItem}
                starItem={this.starItem}
                unstarItem={this.unstarItem}
              />
            );
          })
        ) : (
          <div className="text-center text-muted">No Items Found</div>
        )}

        {items.length ? (
          <div class="browser-cta">
            <button className="btn btn-primary" onClick={this.openInBrowser}>
              Open In Browser
            </button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
