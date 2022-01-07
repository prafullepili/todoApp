import { useState } from 'react';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm';
import NoTodos from './NoTodos';
import TodoList from './TodoList';
import CheckAll from './CheckAll';
import OtherFeature from './OtherFeatures';

export default function App() {
  const [todoInput, setTodoInput] = useState('');
  const [idForTodo, setIdForTodo] = useState(4);
  const [todos, setTodos] = useState([]);

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
    setTodoInput('');
    setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos() {
    const updatedTodos = todos.map(todo => {
      todo.isComplete = true;
      return todo;
    });

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'complete') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
  }

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
        <TodoForm
          addTodo={addTodo}
          setTodoInput={setTodoInput}
          todoInput={todoInput}
        />
        {todos.length === 0 ? (
          <NoTodos />
        ) : (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEdit={cancelEdit}
            deleteTodo={deleteTodo}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        )}

        {todos.length !== 0 && (
          <CheckAll
            remaining={remaining()}
            completeAllTodos={completeAllTodos}
          />
        )}

        {/* All Active Completed btn start */}
        {todos.length !== 0 && <OtherFeature clearCompleted={clearCompleted} />}
      </div>
    </div>
  );
}
