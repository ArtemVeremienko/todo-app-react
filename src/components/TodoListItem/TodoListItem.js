import React from 'react';
import './TodoListItem.css';


const TodoListItem = ({ label, onDeleted, onToggleImportant, onToggleDone, important, done }) => {


  let classNames = 'todo-list-item';
  if (done) classNames += ' done';
  if (important) classNames += ' important';

  return (
    <span className={classNames}>
      <span
        className="todo-list-item-label"
        onClick={onToggleDone}>
        {label}
      </span>

      <button type="button"
        className="btn btn-outline-success btn-sm float-right"
        onClick={onToggleImportant}>
        <span className="fa fa-exclamation" />
      </button>

      <button type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDeleted}>
        <span className="fa fa-trash-o" />
      </button>
    </span>
  );
}

export default TodoListItem;