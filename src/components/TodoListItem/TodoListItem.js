import React from 'react';
import './TodoListItem.css';

const TodoListItem = ({label, important = false}) => {
  const styles = {
      color: important ? 'tomato' : 'black',
      fontWeight: important ? 'bold' : 'normal',
  };

  return (
      <span className="todo-list-item">
        <span 
          className="todo-list-item-label"
          style={styles}>
          { label }
        </span>

        <button type="button"
          className="btn btn-outline-success btn-sm float-right">
            <span className="fa fa-exclamation"/>
        </button>

        <button type="button"
          className="btn btn-outline-danger btn-sm float-right">
            <span className="fa fa-trash-o"/>
        </button>
      </span>
  );
};

export default TodoListItem;