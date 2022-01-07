import React from 'react';

export default function CheckAll(props) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={props.completeAllTodos}>
          Check All
        </div>
      </div>
      <span>{props.remaining} items remaining</span>
    </div>
  );
}
