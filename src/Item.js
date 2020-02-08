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

  constructor() {
    super(...arguments);
    this.state = {
      canShowMore: false
    };
  }

  toggleMore = () => {
    this.setState({
      canShowMore: !this.state.canShowMore
    });
  };

  render() {
    let { text = {}, deleteItem, starItem, unstarItem } = this.props;
    let { id, star, value, lastOpened } = text;

    let lastOpenedTime = getLastOpenedTime(lastOpened);

    let dateString = this.computeDate(text);

    return (
      <div className="">
        <div className="row border mt-1">
          <div className="col-11">
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
                <div>
                  <div className="mb-1">
                    {star ? "⭐ " : null}
                    {value}
                  </div>
                  {lastOpenedTime ? (
                    <>
                      <span className="text-muted italics">
                        Opened: {lastOpenedTime}
                      </span>
                      &nbsp; &bull; &nbsp;{" "}
                    </>
                  ) : null}
                  <span className="text-muted italics">
                    Created: {dateString}
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div
            className="col-1 btn-link cursor-pointer"
            onClick={this.toggleMore}
          >
            ☰
          </div>
        </div>
        {this.state.canShowMore ? (
          <div className="row">
            <div
              className="col-12 p-2 text-center"
              style={{ backgroundColor: "#e2f0ff" }}
            >
              {star ? (
                <small
                  className="btn-link cursor-pointer"
                  onClick={() => unstarItem(id)}
                >
                  UnStar
                </small>
              ) : (
                <small
                  className="btn-link cursor-pointer"
                  onClick={() => starItem(id)}
                >
                  Star
                </small>
              )}
              &nbsp; &bull; &nbsp;
              <small
                className="btn-link cursor-pointer"
                onClick={() => deleteItem(text)}
              >
                Delete
              </small>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function getLastOpenedTime(timeInMills) {
  return timeInMills ? new Date(timeInMills).toDateString() : null;
}
