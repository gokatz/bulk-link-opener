import React from "react";

export default class Item extends React.Component {
  computeDate = text => {
    let { date, dateStr } = text;
    let dateObj;
    if (dateStr) {
      dateObj = new Date(dateStr);
    } else {
      let dateArr = date && date.split("_");
      dateArr[1] = Number(dateArr[1]) + 1;
      let rawDateStr = dateArr.join("/");
      dateObj = new Date(rawDateStr);
    }
    return dateObj.toDateString();
  };

  render() {
    let { text = {}, deleteItem, starItem, unstarItem } = this.props;
    let { id, star, value, date, dateStr } = text;

    let dateString = this.computeDate(text);

    return (
      <div className="form-check">
        <label className="form-check-label link-content" htmlFor={id}>
          <input
            className="form-check-input"
            type="checkbox"
            onChange={event => {
              text.isSelected = event.target.checked;
            }}
            id={id}
          />
          {star ? "⭐" : null} &nbsp;
          <em class="text-muted italics"> {dateString} &nbsp; </em>
          {value} &nbsp;&nbsp;
        </label>
        {star ? (
          <small
            className="btn-link cursor-pointer"
            onClick={() => unstarItem(id)}
          >
            (UnStar)
          </small>
        ) : (
          <small
            className="btn-link cursor-pointer"
            onClick={() => starItem(id)}
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
