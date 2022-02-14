import React from 'react';

export default function OtherFeature(props) {
  return (
    <div className="other-buttons-container">
      <div>
        <button className="button filter-button filter-button-active">
          All
        </button>
        <button className="button filter-button">Active</button>
        <button className="button filter-button">Completed</button>
      </div>
      <div>
        <button className="button" onClick={props.clearCompleted}>
          Clear completed
        </button>
      </div>
    </div>
  );
}
