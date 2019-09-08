import React from "react";

export default class Item extends React.Component {
  onSubmit = event => {
    event.preventDefault();
  };

  render() {
    let { addText, writeUserData } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <input
            ref="inputField"
            className="form-control"
            placeholder="Enter URL"
            onKeyDown={addText}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={() => writeUserData()}>
            Save
          </button>
        </div>
      </form>
    );
  }
}
