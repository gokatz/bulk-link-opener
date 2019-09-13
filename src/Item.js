import React from "react";

export default class Item extends React.Component {
  render() {
    let { text, deleteItem, starItem, unstarItem } = this.props;
    return (
      <div className="form-check">
        <label className="form-check-label link-content" htmlFor={text.id}>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={event => {
              text.isSelected = event.target.checked;
            }}
            id={text.id}
          />
          {text.star ? "⭐" : null}
          {text.value} &nbsp;&nbsp;
        </label>
        {text.star ? (
          <small
            className="btn-link cursor-pointer"
            onClick={() => unstarItem(text.id)}
          >
            (UnStar)
          </small>
        ) : (
          <small
            className="btn-link cursor-pointer"
            onClick={() => starItem(text.id)}
          >
            (Star)
          </small>
        )}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <small
          className="btn-link cursor-pointer"
          onClick={() => deleteItem(text)}
        >
          (Del)
        </small>
      </div>
    );
  }
}
