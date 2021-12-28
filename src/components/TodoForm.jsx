import React from 'react';

export default function TodoForm(props) {
  function handleInput(event) {
    props.setTodoInput(event.target.value);
  }

  return (
    <form action="#" onSubmit={props.addTodo}>
      <input
        type="text"
        value={props.todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
      />
    </form>
  );
}
