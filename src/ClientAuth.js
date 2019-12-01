import React, { Fragment, useState } from "react";

export default function ClientAuth(props) {
  let { authUser, updateKeyNode } = props;

  let [showOnlyStared, setShowOnlyStared] = useState(false);

  return (
    <Fragment>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="key"
          type="password"
          ref={node => {
            updateKeyNode(node);
          }}
          onKeyDown={event => {
            let { keyCode } = event;
            if (keyCode !== 13) {
              return;
            }
            authUser();
          }}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-secondary" onClick={authUser}>
          Enter Key
        </button>
      </div>
    </Fragment>
  );
}
