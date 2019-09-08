import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let storageSpace = "x-text-array";

function getTextsFromStroage() {
  let items = window.localStorage.getItem(storageSpace) || "[]";
  return JSON.parse(items);
}

class App extends React.Component {
  state = {
    items: getTextsFromStroage()
  };

  deleteItem = id => {
    let items = this.state.items;
    items = items.filter(text => {
      return text.id !== id;
    });
    window.localStorage.setItem(storageSpace, JSON.stringify(items));
    this.setState({
      items
    });
  };

  openInBrowser = () => {
    let items = this.state.items;
    let selectedItems = items.filter(text => {
      return text.isSelected;
    });
    selectedItems.forEach(text => {
      // setTimeout(
      //   urlToOpen => {
      //     window.open(urlToOpen, "_blank");
      //   },
      //   1000,
      //   text.value
      // );
      window.open(text.value, "_blank");
    });
  };

  onSubmit = event => {
    event.preventDefault();
  };

  addText = event => {
    let { keyCode, target } = event;
    if (keyCode !== 13) {
      return;
    }

    if (window.confirm("Sure want to add?")) {
      let items = getTextsFromStroage();
      items.push({ value: target.value, id: Date.now() });
      window.localStorage.setItem(storageSpace, JSON.stringify(items));
      this.setState({
        items: items
      });
    }
  };

  // checkboxStateChange = event => {
  //   let value = event.target.value;
  //   this.setState;
  // };

  render() {
    let itemsList = this.state.items.map(text => {
      return (
        <div className="form-check" key={text.id}>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={event => {
              text.isSelected = event.target.checked;
            }}
            id={text.id}
          />
          <label
            className="form-check-label"
            htmlFor={text.id}
            style={{
              wordBreak: "break-word"
            }}
          >
            {text.value} &nbsp;&nbsp;
          </label>
          <small
            className="btn-link cursor-pointer"
            onClick={() => this.deleteItem(text.id)}
          >
            (Delete)
          </small>
        </div>
      );
    });

    itemsList = itemsList.length || (
      <div className="text-center text-muted">No Items Found</div>
    );
    return (
      <div className="App container">
        <div className="col-xs-12 col-md-6">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input className="form-control" onKeyDown={this.addText} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary"> Save </button>
            </div>
          </form>

          <hr />

          {itemsList}

          <hr />
          {itemsList.length ? (
            <button className="btn btn-primary" onClick={this.openInBrowser}>
              Open In Browser
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
