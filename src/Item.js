import React from "react";
import { func } from "prop-types";

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
    let { id, star, value, lastOpened } = text;

    let lastOpenedTime = getLastOpenedTime(lastOpened);

    let dateString = this.computeDate(text);

    return (
      <div className="">
        <div className="row">
          <div className="col-9">
            <div className="form-check">
              <label
                className={`form-check-label link-content ${
                  star ? "text-warning" : ""
                }`}
                htmlFor={id}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={event => {
                    text.isSelected = event.target.checked;
                  }}
                  id={id}
                />
                {star ? "⭐ " : null}
                <div>
                  <div className="mb-1">{value}</div>
                  {lastOpenedTime ? (
                    <>
                      <em className="text-muted italics">
                        Op: {lastOpenedTime}
                      </em>
                      &nbsp; &bull; &nbsp;{" "}
                    </>
                  ) : null}
                  <em className="text-muted italics">Cr: {dateString}</em>
                </div>
              </label>
            </div>
          </div>
          <div className="col-2">
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
          </div>
          <div className="col-1">
            <small
              className="btn-link cursor-pointer"
              onClick={() => deleteItem(text)}
            >
              (Del)
            </small>
          </div>
        </div>
      </div>
    );
  }
}

function getLastOpenedTime(timeInMills) {
  return timeInMills ? new Date(timeInMills).toDateString() : null;
}
