import React from 'react';

export default function TodoList(props) {
  return (
    <ul className="todo-list">
      {props.todos.map((todo, index) => (
        // list item start
        <li className="todo-item-container" key={todo.id}>
          <div className="todo-item">
            <input
              type="checkbox"
              onChange={() => props.completeTodo(todo.id)}
              checked={todo.isComplete ? true : false}
            />
            {!todo.isEditing ? (
              <span
                onDoubleClick={() => props.markAsEditing(todo.id)}
                className={`todo-item-label ${
                  todo.isComplete ? 'line-through' : ''
                }`}
              >
                {todo.title}
              </span>
            ) : (
              <input
                type="text"
                onBlur={event => props.updateTodo(event, todo.id)}
                onKeyDown={event => {
                  event.key === 'Enter'
                    ? props.updateTodo(event, todo.id)
                    : event.key === 'Escape' &&
                      props.cancelEdit(event, todo.id);
                }}
                className="todo-item-input"
                defaultValue={todo.title}
                autoFocus
              />
            )}
          </div>
          <button
            className="x-button"
            onClick={() => props.deleteTodo(todo.id)}
          >
            <svg
              className="x-button-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="red"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
        // list item end
      ))}
    </ul>
  );
}
