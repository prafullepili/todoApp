import React from 'react';

export default function CheckAll(props) {
  return (
    <div className="check-all-container">
      <div>
        <div className="button" onClick={props.check_all}>
          {props.checkUncheck ? 'Uncheck all' : 'Check all'}
        </div>
      </div>
      <span>
        {props.remaining} item{props.remaining > 1 && 's'} left
      </span>
    </div>
  );
}
