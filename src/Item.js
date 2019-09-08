import React from "react";

export default class Item extends React.Component {
  render() {
    let { text, deleteItem } = this.props;
    return (
      <div className="form-check">
        <label className="form-check-label link-content" htmlFor={text.id}>
          <input
            type="text"
            className="form-check-input"
            type="checkbox"
            onChange={event => {
              text.isSelected = event.target.checked;
            }}
            id={text.id}
          />
          {text.value} &nbsp;&nbsp;
        </label>
        <small
          className="btn-link cursor-pointer"
          onClick={() => deleteItem(text.id)}
        >
          (Del)
        </small>
      </div>
    );
  }
}
