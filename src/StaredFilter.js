import React, { Fragment, useState } from "react";

export default function StaredFilter(props) {
  let { isAuthenticated, onViewChange } = props;

  let [showOnlyStared, setShowOnlyStared] = useState(false);

  return (
    <Fragment>
      <input
        type="checkbox"
        id="show_stared_alone"
        onChange={event => {
          let isChecked = event.target.checked;
          setShowOnlyStared(isChecked);
          onViewChange({
            showOnlyStared: isChecked
          });
        }}
        checked={showOnlyStared}
      />
      &nbsp;
      <label htmlFor="show_stared_alone"> Show Stared Alone </label>
    </Fragment>
  );
}
