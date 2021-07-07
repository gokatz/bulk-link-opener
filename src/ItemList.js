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

  updateLastModifiedTime = id => {
    return window.firebase
      .database()
      .ref(`${this.props.databaseRef}/${id}`)
      .update({
        lastOpened: new Date()
      });
  };

  openInBrowser = () => {
    let items = this.state.items;
    let selectedItems = items.filter(text => {
      if (text.isSelected) {
        this.updateLastModifiedTime(text.id);
      }
      return text.isSelected;
    });
    selectedItems.forEach(text => {
      window.open(text.value, "_blank");
    });
  };

  deselectAll = () => {
    return this.state.items.map(item => {
      item.isSelected = false;
      return item;
    });
  };

  render() {
    let {
      isFetchingUser,
      showOnlyStared,
      deleteItem,
      starItem,
      deselectAll
    } = this.props;
    let { loading, items } = this.state;

    if (showOnlyStared) {
      items = this.filterItems();
    }

    if (deselectAll) {
      items = this.deselectAll();
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
                deleteItem={deleteItem}
                starItem={starItem}
                unstarItem={this.unstarItem}
              />
            );
          })
        ) : (
          <div className="text-center text-muted">No Items Found</div>
        )}

        {items.length ? (
          <div className="browser-cta">
            <button className="btn btn-primary" onClick={this.openInBrowser}>
              Open In Browser
            </button>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
