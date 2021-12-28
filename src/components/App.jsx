/* eslint-disable no-unused-vars */
import '../reset.css';
import '../App.css';
import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  useEffect(() => {
    // console.log(todos, idForTodo);
    setTodoInput('');
  }, [todos]);

  const [todoInput, setTodoInput] = useState('');
  const [idForTodo, setIdForTodo] = useState(4);

  function addTodo(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todoInput,
        isComplete: false,
        isEditing: false,
      },
    ]);
    // setTodoInput('');
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

  function handleInput(event) {
    setTodoInput(event.target.value);
  }

  // On Change event of checkbox
  function completeTodo(id) {
    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id
          ? {
              ...todo,
              isComplete: !todo.isComplete,
            }
          : todo
      )
    );
  }

  function markAsEditing(id) {
    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id
          ? {
              ...todo,
              isEditing: !todo.isEditing,
            }
          : todo
      )
    );
  }

  function updateTodo(event, id) {
    // const updatedTodos = todos.map(todo => {
    //   if (todo.id === id) {
    //     if (event.target.value.trim().length === 0) {
    //       todo.isEditing = false;
    //       return todo;
    //     }
    //     todo.title = event.target.value;
    //     todo.isEditing = false;
    //   }
    //   return todo;
    // });

    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id
          ? event.target.value.trim().length === 0
            ? {
                ...todo,
                isEditing: false,
              }
            : {
                ...todo,
                title: event.target.value,
                isEditing: false,
              }
          : {
              ...todo,
            }
      )
    );
  }

  function cancelEdit(event, id) {
    setTodos(prevTodo =>
      prevTodo.map(todo =>
        todo.id === id
          ? {
              ...todo,
              isEditing: false,
            }
          : todo
      )
    );
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        {/* todo input start */}
        <form action="#" onSubmit={addTodo}>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        {/* todo list start */}
        <ul className="todo-list">
          {todos.map((todo, index) => (
            // list item start
            <li className="todo-item-container" key={todo.id}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  onChange={() => completeTodo(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
                {!todo.isEditing ? (
                  <span
                    onDoubleClick={() => markAsEditing(todo.id)}
                    className={`todo-item-label ${
                      todo.isComplete ? 'line-through' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                ) : (
                  <input
                    type="text"
                    onBlur={event => updateTodo(event, todo.id)}
                    onKeyDown={event => {
                      event.key === 'Enter'
                        ? updateTodo(event, todo.id)
                        : event.key === 'Escape' && cancelEdit(event, todo.id);
                    }}
                    className="todo-item-input"
                    defaultValue={todo.title}
                    autoFocus
                  />
                )}
              </div>
              <button className="x-button" onClick={() => deleteTodo(todo.id)}>
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

        {/* Check all container start */}
        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>
          <span>3 items remaining</span>
        </div>

        {/* All Active Completed btn start */}
        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}
